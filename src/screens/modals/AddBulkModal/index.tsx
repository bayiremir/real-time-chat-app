import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createList} from '../../../redux/slices/listsSlice';
import {User} from '../../../interfaces/api.interface';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {styles} from './styles';
import {RootState} from '../../../redux/store';
import {RootStackParamList} from '../../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

type AddBulkModalRouteProp = RouteProp<RootStackParamList, 'AddBulkModal'>;

type AddBulkModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddBulkModal'
>;

const AddBulkModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<AddBulkModalNavigationProp>();
  const route = useRoute<AddBulkModalRouteProp>();
  const {contacts} = route.params;

  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {user} = useSelector((state: RootState) => state.userSlice);

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

    navigation.goBack();
    Alert.alert('Başarılı', `Toplu mesaj grubu oluşturuldu`);
  }, [selectedMembers, dispatch, navigation]);

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
    navigation.goBack();
  }, [navigation]);

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
    const isSelected = selectedMembers.some(m => m._id === contact._id);

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
      <ScrollView style={styles.contactsList}>
        {Object.keys(groupedContacts)
          .sort()
          .map(letter => renderContactSection(letter, groupedContacts[letter]))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBulkModal;
