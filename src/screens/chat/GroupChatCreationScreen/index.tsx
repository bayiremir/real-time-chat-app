import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  useGetContactsQuery,
  useCreateChatMutation,
} from '../../../redux/services/mobileApi';
import {RootStackParamList} from '../../../navigation/types';
import {User} from '../../../interfaces/api.interface';

// Icons
import {
  ArrowLeftIcon,
  CheckIcon,
  UserGroupIcon,
} from 'react-native-heroicons/outline';
import {styles} from './styles';

type GroupChatCreationNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GroupChatCreation'
>;

const GroupChatCreationScreen = () => {
  const navigation = useNavigation<GroupChatCreationNavigationProp>();
  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(
    new Set(),
  );

  const {data: contactsData, isLoading} = useGetContactsQuery({
    page: 1,
    limit: 100,
  });
  const [createChat, {isLoading: isCreating}] = useCreateChatMutation();

  const contacts = contactsData?.data || [];

  const handleContactToggle = useCallback((contactId: string) => {
    setSelectedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(contactId)) {
        newSet.delete(contactId);
      } else {
        newSet.add(contactId);
      }
      return newSet;
    });
  }, []);

  const handleCreateGroup = useCallback(async () => {
    if (!groupName.trim()) {
      Alert.alert('Hata', 'Lütfen grup adını giriniz');
      return;
    }

    if (selectedContacts.size < 2) {
      Alert.alert('Hata', 'En az 2 kişi seçmeniz gerekiyor');
      return;
    }

    try {
      const result = await createChat({
        type: 'group',
        name: groupName.trim(),
        participants: Array.from(selectedContacts),
      }).unwrap();

      if (result.success) {
        Alert.alert('Başarılı', 'Grup oluşturuldu', [
          {
            text: 'Tamam',
            onPress: () => {
              navigation.navigate('ChatDetail', {chat: result.data});
            },
          },
        ]);
      }
    } catch (error: any) {
      Alert.alert('Hata', 'Grup oluşturulurken bir hata oluştu');
    }
  }, [groupName, selectedContacts, createChat, navigation]);

  const renderContactItem = useCallback(
    ({item}: {item: User}) => {
      const isSelected = selectedContacts.has(item._id);

      return (
        <TouchableOpacity
          style={[styles.contactItem, isSelected && styles.selectedContact]}
          onPress={() => handleContactToggle(item._id)}
          activeOpacity={0.7}>
          <View style={styles.contactInfo}>
            <View style={styles.avatarContainer}>
              {item.avatar ? (
                <Image source={{uri: item.avatar}} style={styles.avatar} />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Text style={styles.avatarText}>
                    {item.firstName[0]?.toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
          </View>
          <View
            style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
            {isSelected && <CheckIcon size={16} color="#FFFFFF" />}
          </View>
        </TouchableOpacity>
      );
    },
    [selectedContacts, handleContactToggle],
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yeni Grup</Text>
        <TouchableOpacity
          style={[
            styles.createButton,
            (!groupName.trim() || selectedContacts.size < 2) &&
              styles.createButtonDisabled,
          ]}
          onPress={handleCreateGroup}
          disabled={
            !groupName.trim() || selectedContacts.size < 2 || isCreating
          }>
          {isCreating ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.createButtonText}>Oluştur</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Group Info */}
      <View style={styles.groupInfoSection}>
        <View style={styles.groupIconContainer}>
          <UserGroupIcon size={40} color="#25D366" />
        </View>
        <TextInput
          style={styles.groupNameInput}
          value={groupName}
          onChangeText={setGroupName}
          placeholder="Grup adı..."
          placeholderTextColor="#9CA3AF"
          maxLength={25}
        />
      </View>

      {/* Selected Count */}
      <View style={styles.selectedSection}>
        <Text style={styles.selectedText}>
          {selectedContacts.size} kişi seçildi
        </Text>
      </View>

      {/* Contacts List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25D366" />
          <Text style={styles.loadingText}>Kişiler yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={item => item._id}
          style={styles.contactsList}
          contentContainerStyle={styles.contactsListContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default GroupChatCreationScreen;
