import React, {useCallback, useRef, useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {createList} from '../../../../redux/slices/listsSlice';
import {User} from '../../../../interfaces/api.interface';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';
import {RootState} from '../../../../redux/store';
import {COLORS} from '../../../../constants/COLORS';

interface AddBulkBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  contacts: User[];
  isLoading?: boolean;
}

const AddBulkBottomSheet: React.FC<AddBulkBottomSheetProps> = ({
  isVisible,
  onClose,
  contacts,
  isLoading = false,
}) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {user} = useSelector((state: RootState) => state.userSlice);

  const snapPoints = ['90%'];

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

  const handleCreateBulkGroup = useCallback(() => {
    if (selectedMembers.length === 0) {
      Alert.alert('Hata', 'En az bir kişi seçmelisiniz');
      return;
    }

    const groupName = `Toplu Mesaj ${new Date().toLocaleDateString()}`;

    dispatch(
      createList({
        name: groupName,
        members: selectedMembers,
        description: 'Toplu mesaj grubu',
        color: '#25D366',
        type: 'bulk',
      }),
    );

    // Reset form
    setSelectedMembers([]);
    setSearchQuery('');
    onClose();
    Alert.alert('Başarılı', `Toplu mesaj grubu oluşturuldu`);
  }, [selectedMembers, dispatch, onClose]);

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
    setSearchQuery('');
    onClose();
  }, [onClose]);

  // Filter and group contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query);
    });
  }, [contacts, searchQuery]);

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const groups: {[key: string]: User[]} = {};
    filteredContacts.forEach(contact => {
      const firstLetter = contact.firstName[0]?.toUpperCase() || '#';
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(contact);
    });

    // Sort groups alphabetically
    const sortedGroups = Object.keys(groups)
      .sort()
      .reduce((acc, key) => {
        acc[key] = groups[key].sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`,
          ),
        );
        return acc;
      }, {} as {[key: string]: User[]});

    return sortedGroups;
  }, [filteredContacts]);

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
      backgroundStyle={{backgroundColor: COLORS.backgroundColor}}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      enableDynamicSizing={false}
      handleIndicatorStyle={styles.handleIndicator}>
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>İptal</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Alıcılar</Text>
            <Text style={styles.headerCount}>{selectedMembers.length}/256</Text>
          </View>
          <TouchableOpacity
            onPress={handleCreateBulkGroup}
            style={[
              styles.createButton,
              selectedMembers.length === 0 && styles.disabledCreateButton,
            ]}>
            <Text
              style={[
                styles.createText,
                selectedMembers.length === 0 && styles.disabledCreateText,
              ]}>
              Oluştur
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <MagnifyingGlassIcon size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Ara"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Info Text */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Sadece telefon rehberinde {user?.phone} kayıtlı olan kişiler toplu
            mesajlarınızı alacak.
          </Text>
        </View>

        {/* Contact List */}
        <View style={styles.contactsContainer}>
          <ScrollView
            style={styles.contactsList}
            showsVerticalScrollIndicator={false}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Kontaklar yükleniyor...</Text>
              </View>
            ) : Object.keys(groupedContacts).length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Kişi bulunamadı</Text>
              </View>
            ) : (
              Object.keys(groupedContacts).map(letter => (
                <View key={letter}>
                  <Text style={styles.sectionHeader}>{letter}</Text>
                  {groupedContacts[letter].map(contact => {
                    const isSelected = selectedMembers.some(
                      m => m._id === contact._id,
                    );
                    return (
                      <TouchableOpacity
                        key={contact._id}
                        style={styles.contactItem}
                        onPress={() => handleMemberToggle(contact)}
                        activeOpacity={0.6}>
                        <View style={styles.contactLeft}>
                          <View style={styles.avatarContainer}>
                            {contact.avatar ? (
                              <Image
                                source={{uri: contact.avatar}}
                                style={styles.avatar}
                              />
                            ) : (
                              <View style={styles.defaultAvatar}>
                                <Text style={styles.avatarText}>
                                  {contact.firstName[0]?.toUpperCase()}
                                </Text>
                              </View>
                            )}
                          </View>
                          <View style={styles.contactInfo}>
                            <Text style={styles.contactName}>
                              {contact.firstName} {contact.lastName}
                            </Text>
                            {contact.bio && (
                              <Text style={styles.contactBio} numberOfLines={1}>
                                {contact.bio}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={[
                            styles.checkbox,
                            isSelected && styles.checkedCheckbox,
                          ]}>
                          {isSelected && <View style={styles.checkmark} />}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default AddBulkBottomSheet;
