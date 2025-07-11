import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {createList} from '../../../redux/slices/listsSlice';
import {User} from '../../../interfaces/api.interface';
import {XMarkIcon, PlusIcon, UserIcon} from 'react-native-heroicons/outline';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';
import {styles} from './styles';
import ContactSelectionBottomSheet from './ContactSelectionBottomSheet';

interface CreateListBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateListBottomSheet: React.FC<CreateListBottomSheetProps> = ({
  isVisible,
  onClose,
}) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [listName, setListName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [showContactSelection, setShowContactSelection] = useState(false);

  // API'den contacts çek
  const {data: contactsResponse, isLoading: contactsLoading} =
    useGetContactsQuery({
      page: 1,
      limit: 100,
    });

  const contacts = contactsResponse?.data || [];

  const snapPoints = ['50%', '80%'];

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const handleCreateList = useCallback(() => {
    if (!listName.trim()) {
      Alert.alert('Hata', 'Liste adı boş olamaz');
      return;
    }

    if (selectedMembers.length === 0) {
      Alert.alert('Hata', 'En az bir kişi seçmelisiniz');
      return;
    }

    dispatch(
      createList({
        name: listName.trim(),
        members: selectedMembers,
      }),
    );

    // Reset form
    setListName('');
    setSelectedMembers([]);
    onClose();
    Alert.alert('Başarılı', 'Liste oluşturuldu');
  }, [listName, selectedMembers, dispatch, onClose]);

  const handleClose = useCallback(() => {
    setListName('');
    setSelectedMembers([]);
    onClose();
  }, [onClose]);

  const handleContactsSelected = useCallback((contacts: User[]) => {
    setSelectedMembers(contacts);
    setShowContactSelection(false);
  }, []);

  const handleRemoveMember = useCallback((memberId: string) => {
    setSelectedMembers(prev => prev.filter(member => member._id !== memberId));
  }, []);

  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return <Image source={{uri: user.avatar}} style={styles.memberAvatar} />;
    } else {
      return (
        <View style={styles.memberAvatarPlaceholder}>
          <UserIcon size={20} color="#666" />
        </View>
      );
    }
  };

  React.useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose>
        <BottomSheetView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Yeni Liste Oluştur</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <XMarkIcon size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Liste Adı</Text>
              <TextInput
                style={styles.input}
                value={listName}
                onChangeText={setListName}
                placeholder="Örnekler: İş, Arkadaşlar"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Oluşturduğuunuz her liste Sohbetler sekmenizin üst kısmında bir
                filtre olarak görünecektir.
              </Text>
            </View>

            <View style={styles.membersContainer}>
              <Text style={styles.label}>
                Dahil Edilenler ({selectedMembers.length})
              </Text>

              <View style={styles.membersSection}>
                <TouchableOpacity
                  style={styles.addMemberButton}
                  onPress={() => setShowContactSelection(true)}>
                  <View style={styles.addMemberIconContainer}>
                    <PlusIcon size={20} color="#25D366" />
                  </View>
                  <Text style={styles.addMemberText}>
                    Kişi veya grup ekleyin
                  </Text>
                </TouchableOpacity>

                {selectedMembers.length > 0 && <View style={styles.divider} />}

                {/* Seçilen üyeleri göster */}
                {selectedMembers.map((member, index) => (
                  <View key={member._id}>
                    <View style={styles.memberItem}>
                      {renderAvatar(member)}
                      <View style={styles.memberInfo}>
                        <Text style={styles.memberName}>
                          {member.firstName} {member.lastName}
                        </Text>
                        <Text style={styles.memberPhone}>{member.phone}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleRemoveMember(member._id)}
                        style={styles.removeMemberButton}>
                        <XMarkIcon size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                    {index < selectedMembers.length - 1 && (
                      <View style={styles.divider} />
                    )}
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.createButton,
                (!listName.trim() || selectedMembers.length === 0) &&
                  styles.disabledButton,
              ]}
              onPress={handleCreateList}
              disabled={!listName.trim() || selectedMembers.length === 0}>
              <Text style={styles.createButtonText}>Liste Oluştur</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>

      {/* Contact Selection Bottom Sheet */}
      <ContactSelectionBottomSheet
        isVisible={showContactSelection}
        onClose={() => setShowContactSelection(false)}
        contacts={contacts}
        isLoading={contactsLoading}
        selectedMembers={selectedMembers}
        onContactsSelected={handleContactsSelected}
      />
    </>
  );
};

export default CreateListBottomSheet;
