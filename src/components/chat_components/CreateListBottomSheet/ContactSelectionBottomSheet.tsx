import React, {useCallback, useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {User} from '../../../interfaces/api.interface';
import {XMarkIcon, CheckIcon, UserIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';

interface ContactSelectionBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  contacts: User[];
  isLoading?: boolean;
  selectedMembers: User[];
  onContactsSelected: (contacts: User[]) => void;
}

const ContactSelectionBottomSheet: React.FC<
  ContactSelectionBottomSheetProps
> = ({
  isVisible,
  onClose,
  contacts,
  isLoading = false,
  selectedMembers,
  onContactsSelected,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [tempSelectedMembers, setTempSelectedMembers] = useState<User[]>([]);

  const snapPoints = ['70%', '90%'];

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const handleMemberToggle = useCallback((member: User) => {
    setTempSelectedMembers(prev => {
      const isSelected = prev.some(m => m._id === member._id);
      if (isSelected) {
        return prev.filter(m => m._id !== member._id);
      } else {
        return [...prev, member];
      }
    });
  }, []);

  const handleDone = useCallback(() => {
    onContactsSelected(tempSelectedMembers);
  }, [tempSelectedMembers, onContactsSelected]);

  const handleClose = useCallback(() => {
    setTempSelectedMembers(selectedMembers);
    onClose();
  }, [selectedMembers, onClose]);

  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return <Image source={{uri: user.avatar}} style={styles.contactAvatar} />;
    } else {
      return (
        <View style={styles.contactAvatarPlaceholder}>
          <UserIcon size={16} color="#666" />
        </View>
      );
    }
  };

  const renderChipAvatar = (user: User) => {
    if (user.avatar) {
      return <Image source={{uri: user.avatar}} style={styles.chipAvatar} />;
    } else {
      return (
        <View style={styles.chipAvatarPlaceholder}>
          <UserIcon size={12} color="#fff" />
        </View>
      );
    }
  };

  const renderSelectedMemberChip = (member: User) => {
    return (
      <TouchableOpacity
        key={member._id}
        style={styles.selectedMemberChip}
        onPress={() => handleMemberToggle(member)}>
        {renderChipAvatar(member)}
        <Text style={styles.selectedMemberChipText}>{member.firstName}</Text>
        <XMarkIcon size={12} color="#fff" />
      </TouchableOpacity>
    );
  };

  // selectedMembers değiştiğinde tempSelectedMembers'ı güncelle
  useEffect(() => {
    setTempSelectedMembers(selectedMembers);
  }, [selectedMembers]);

  useEffect(() => {
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
      enableDynamicSizing={false}>
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Kişi Seç</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <XMarkIcon size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.membersContainer}>
            <Text style={styles.label}>
              Seçilen Kişiler ({tempSelectedMembers.length})
            </Text>

            {/* Seçilen üyeleri horizontal scroll'da göster */}
            {tempSelectedMembers.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.selectedMembersHorizontalContainer}>
                {tempSelectedMembers.map(member =>
                  renderSelectedMemberChip(member),
                )}
              </ScrollView>
            )}

            {/* Kontaklar listesi */}
            <ScrollView style={styles.contactsList}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>
                    Kontaklar yükleniyor...
                  </Text>
                </View>
              ) : contacts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    Henüz bir kontağınız bulunmuyor
                  </Text>
                </View>
              ) : (
                contacts.map(contact => {
                  const isSelected = tempSelectedMembers.some(
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
                      {renderAvatar(contact)}
                      <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>
                          {contact.firstName} {contact.lastName}
                        </Text>
                        <Text style={styles.contactPhone}>{contact.phone}</Text>
                      </View>
                      {isSelected && (
                        <View style={styles.selectedIndicator}>
                          <CheckIcon size={16} color="#25D366" />
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
              styles.doneButton,
              tempSelectedMembers.length === 0 && styles.disabledButton,
            ]}
            onPress={handleDone}
            disabled={tempSelectedMembers.length === 0}>
            <Text style={styles.doneButtonText}>
              {tempSelectedMembers.length > 0
                ? `Bitti (${tempSelectedMembers.length})`
                : 'Bitti'}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ContactSelectionBottomSheet;
