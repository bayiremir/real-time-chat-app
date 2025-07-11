import React, {useCallback, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {addMembersToList} from '../../../redux/slices/listsSlice';
import {User} from '../../../interfaces/api.interface';
import {XMarkIcon, PlusIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';

interface AddMemberBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  contacts: User[];
  isLoading?: boolean;
  listId: string;
  existingMembers: User[];
}

const AddMemberBottomSheet: React.FC<AddMemberBottomSheetProps> = ({
  isVisible,
  onClose,
  contacts,
  isLoading = false,
  listId,
  existingMembers,
}) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  const snapPoints = ['70%', '90%'];

  // Mevcut üyeleri filtrele
  const availableContacts = contacts.filter(
    contact => !existingMembers.some(member => member._id === contact._id),
  );

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const handleAddMembers = useCallback(() => {
    if (selectedMembers.length === 0) {
      Alert.alert('Hata', 'En az bir kişi seçmelisiniz');
      return;
    }

    dispatch(
      addMembersToList({
        listId,
        members: selectedMembers,
      }),
    );

    // Reset form
    setSelectedMembers([]);
    onClose();
    Alert.alert('Başarılı', `${selectedMembers.length} kişi listeye eklendi`);
  }, [selectedMembers, dispatch, onClose, listId]);

  const handleMemberToggle = useCallback((member: User) => {
    setSelectedMembers(prev => {
      const isSelected = prev.some(m => m._id === member._id);
      if (isSelected) {
        return prev.filter(m => m._id !== member._id);
      } else {
        return [...prev, member];
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedMembers([]);
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      enableDynamicSizing={false}
      handleIndicatorStyle={styles.handleIndicator}>
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Üye Ekle</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <XMarkIcon size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.membersContainer}>
            <Text style={styles.label}>
              Eklenecek Kişiler ({selectedMembers.length})
            </Text>

            {selectedMembers.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.selectedMembersContainer}>
                {selectedMembers.map(member => (
                  <TouchableOpacity
                    key={member._id}
                    style={styles.selectedMember}
                    onPress={() => handleMemberToggle(member)}>
                    <Text style={styles.selectedMemberText}>
                      {member.firstName} {member.lastName}
                    </Text>
                    <XMarkIcon size={16} color="#666" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <ScrollView style={styles.contactsList}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>
                    Kontaklar yükleniyor...
                  </Text>
                </View>
              ) : availableContacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Tüm kontaklarınız zaten bu listede
                  </Text>
                </View>
              ) : (
                availableContacts.map(contact => {
                  const isSelected = selectedMembers.some(
                    m => m._id === contact._id,
                  );
                  return (
                    <TouchableOpacity
                      key={contact._id}
                      style={[
                        styles.contactItem,
                        isSelected && styles.selectedContactItem,
                      ]}
                      onPress={() => handleMemberToggle(contact)}>
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>
                          {contact.firstName} {contact.lastName}
                        </Text>
                        <Text style={styles.contactPhone}>{contact.phone}</Text>
                      </View>
                      {isSelected && (
                        <View style={styles.selectedIndicator}>
                          <PlusIcon size={16} color="#25D366" />
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={[
              styles.addButton,
              selectedMembers.length === 0 && styles.disabledButton,
            ]}
            onPress={handleAddMembers}
            disabled={selectedMembers.length === 0}>
            <Text style={styles.addButtonText}>
              {selectedMembers.length > 0
                ? `${selectedMembers.length} Kişi Ekle`
                : 'Kişi Ekle'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default AddMemberBottomSheet;
