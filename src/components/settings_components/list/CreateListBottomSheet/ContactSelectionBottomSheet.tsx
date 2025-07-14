import React, {useCallback, useRef, useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {User} from '../../../../interfaces/api.interface';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';
import {COLORS} from '../../../../constants/COLORS';

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
  const [searchQuery, setSearchQuery] = useState('');

  const snapPoints = ['90%'];

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
    setSearchQuery('');
    onClose();
  }, [selectedMembers, onClose]);

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
            <Text style={styles.headerTitle}>Kişi Seç</Text>
            <Text style={styles.headerCount}>
              {tempSelectedMembers.length} seçili
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleDone}
            style={[
              styles.createButton,
              tempSelectedMembers.length === 0 && styles.disabledCreateButton,
            ]}>
            <Text
              style={[
                styles.createText,
                tempSelectedMembers.length === 0 && styles.disabledCreateText,
              ]}>
              Bitti
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
            Listeye eklemek istediğiniz kişileri seçin.
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
                <Text style={styles.emptyText}>
                  {searchQuery
                    ? 'Kişi bulunamadı'
                    : 'Henüz bir kontağınız bulunmuyor'}
                </Text>
              </View>
            ) : (
              Object.keys(groupedContacts).map(letter => (
                <View key={letter}>
                  <Text style={styles.sectionHeader}>{letter}</Text>
                  {groupedContacts[letter].map(contact => {
                    const isSelected = tempSelectedMembers.some(
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
                            <Text style={styles.contactPhone}>
                              {contact.phone}
                            </Text>
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

export default ContactSelectionBottomSheet;
