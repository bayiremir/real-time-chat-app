import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {User} from '../../../interfaces/api.interface';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';
import {RootStackParamList} from '../../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

type ContactSelectionModalRouteProp = RouteProp<
  RootStackParamList,
  'ContactSelectionModal'
>;

type ContactSelectionModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactSelectionModal'
>;

const ContactSelectionModal: React.FC = () => {
  const navigation = useNavigation<ContactSelectionModalNavigationProp>();
  const route = useRoute<ContactSelectionModalRouteProp>();
  const {contacts, selectedMembers, listId, isCreatingList} = route.params;

  const [tempSelectedMembers, setTempSelectedMembers] = useState<User[]>(
    selectedMembers || [],
  );
  const [searchQuery, setSearchQuery] = useState('');

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
    if (isCreatingList) {
      // Navigate back to CreateListModal with selected members
      navigation.navigate('CreateListModal', {
        selectedMembers: tempSelectedMembers,
      } as any);
    } else if (listId) {
      // Navigate back to AddMemberModal with selected members
      navigation.navigate('AddMemberModal', {
        contacts,
        listId,
        existingMembers: selectedMembers,
        selectedMembers: tempSelectedMembers,
      } as any);
    } else {
      navigation.goBack();
    }
  }, [
    tempSelectedMembers,
    isCreatingList,
    listId,
    contacts,
    selectedMembers,
    navigation,
  ]);

  const handleClose = useCallback(() => {
    setTempSelectedMembers(selectedMembers || []);
    setSearchQuery('');
    navigation.goBack();
  }, [selectedMembers, navigation]);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query);
    });
  }, [contacts, searchQuery]);

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const grouped: {[key: string]: User[]} = {};
    filteredContacts.forEach(contact => {
      const firstLetter = contact.firstName.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(contact);
    });
    return grouped;
  }, [filteredContacts]);

  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return <Image source={{uri: user.avatar}} style={styles.avatar} />;
    } else {
      return <View style={styles.defaultAvatar} />;
    }
  };

  const renderContactItem = (contact: User) => {
    const isSelected = tempSelectedMembers.some(m => m._id === contact._id);

    return (
      <TouchableOpacity
        key={contact._id}
        style={[styles.contactItem, isSelected && styles.selectedContactItem]}
        onPress={() => handleMemberToggle(contact)}>
        <View style={styles.contactLeft}>
          <View style={styles.avatarContainer}>{renderAvatar(contact)}</View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>
              {contact.firstName} {contact.lastName}
            </Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderContactSection = (letter: string, contacts: User[]) => (
    <View key={letter} style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{letter}</Text>
      {contacts.map(contact => renderContactItem(contact))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
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
          {isCreatingList
            ? 'Listeye eklemek istediğiniz kişileri seçin.'
            : 'Listeye eklemek için kişileri seçin.'}
        </Text>
      </View>

      {/* Contact List */}
      <ScrollView style={styles.contactsList}>
        {Object.keys(groupedContacts)
          .sort()
          .map(letter => renderContactSection(letter, groupedContacts[letter]))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactSelectionModal;
