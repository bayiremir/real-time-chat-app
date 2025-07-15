import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  useGetContactsQuery,
  useRemoveContactMutation,
  useBlockUserMutation,
  useCreateChatMutation,
} from '../../../redux/services/mobileApi';
import {User} from '../../../interfaces/api.interface';
import {styles} from './styles';

import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  EllipsisVerticalIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';

interface ContactActionsProps {
  contact: User;
  onRemove: (contactId: string) => void;
  onBlock: (contactId: string) => void;
  onChat: (contact: User) => void;
}

const ContactActions: React.FC<ContactActionsProps> = ({
  contact,
  onRemove,
  onBlock,
  onChat,
}) => {
  const handleOptionsPress = useCallback(() => {
    Alert.alert(
      contact.firstName + ' ' + contact.lastName,
      'Ne yapmak istiyorsunuz?',
      [
        {
          text: 'Mesaj Gönder',
          onPress: () => onChat(contact),
        },
        {
          text: 'Kişiyi Sil',
          onPress: () => onRemove(contact._id),
          style: 'destructive',
        },
        {
          text: 'Engelle',
          onPress: () => onBlock(contact._id),
          style: 'destructive',
        },
        {text: 'İptal', style: 'cancel'},
      ],
    );
  }, [contact, onRemove, onBlock, onChat]);

  return (
    <TouchableOpacity style={styles.actionsButton} onPress={handleOptionsPress}>
      <EllipsisVerticalIcon size={20} color="#6B7280" />
    </TouchableOpacity>
  );
};

const ContactsScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: contactsData,
    isLoading,
    refetch,
  } = useGetContactsQuery({page: 1, limit: 100});

  const [removeContact] = useRemoveContactMutation();
  const [blockUser] = useBlockUserMutation();
  const [createChat] = useCreateChatMutation();

  const filteredContacts = useMemo(() => {
    const contacts = contactsData?.data || [];
    if (!searchQuery.trim()) return contacts;

    return contacts.filter(contact => {
      const fullName =
        `${contact?.firstName} ${contact?.lastName}`.toLowerCase();
      const phone = contact?.phone?.toLowerCase() || '';
      const query = searchQuery?.toLowerCase();

      return fullName.includes(query) || phone.includes(query);
    });
  }, [contactsData?.data, searchQuery]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleRemoveContact = useCallback(
    async (contactId: string) => {
      try {
        const result = await removeContact(contactId).unwrap();
        if (result.success) {
          Alert.alert('Başarılı', 'Kişi listeden kaldırıldı');
          refetch();
        }
      } catch (error: any) {
        Alert.alert('Hata', 'Kişi silinirken bir hata oluştu');
      }
    },
    [removeContact, refetch],
  );

  const handleBlockUser = useCallback(
    async (userId: string) => {
      Alert.alert(
        'Kullanıcıyı Engelle',
        'Bu kullanıcıyı engellemek istediğinizden emin misiniz?',
        [
          {text: 'İptal', style: 'cancel'},
          {
            text: 'Engelle',
            style: 'destructive',
            onPress: async () => {
              try {
                const result = await blockUser({userId}).unwrap();
                if (result.success) {
                  Alert.alert('Başarılı', 'Kullanıcı engellendi');
                  refetch();
                }
              } catch (error: any) {
                Alert.alert('Hata', 'Kullanıcı engellenirken bir hata oluştu');
              }
            },
          },
        ],
      );
    },
    [blockUser, refetch],
  );

  const handleStartChat = useCallback(
    async (contact: User) => {
      try {
        const result = await createChat({
          type: 'private',
          participants: [contact._id],
        }).unwrap();

        if (result.success) {
          navigation.navigate('ChatDetail', {chat: result.data});
        }
      } catch (error: any) {
        Alert.alert('Hata', 'Sohbet başlatılırken bir hata oluştu');
      }
    },
    [createChat, navigation],
  );

  const handleAddContact = useCallback(() => {
    navigation.navigate('UserSearch' as never);
  }, [navigation]);

  const renderContactItem = useCallback(
    ({item}: {item: User}) => (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => handleStartChat(item)}
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
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>

          <View style={styles.contactDetails}>
            <Text style={styles.contactName}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.contactPhone}>{item.phone}</Text>
            {item.bio && (
              <Text style={styles.contactBio} numberOfLines={1}>
                {item.bio}
              </Text>
            )}
          </View>
        </View>

        <ContactActions
          contact={item}
          onRemove={handleRemoveContact}
          onBlock={handleBlockUser}
          onChat={handleStartChat}
        />
      </TouchableOpacity>
    ),
    [handleStartChat, handleRemoveContact, handleBlockUser],
  );

  const renderEmptyState = useCallback(() => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyState}>
        <UserPlusIcon size={64} color="#9CA3AF" />
        <Text style={styles.emptyStateTitle}>
          {searchQuery ? 'Kişi bulunamadı' : 'Henüz kişiniz yok'}
        </Text>
        <Text style={styles.emptyStateSubtitle}>
          {searchQuery
            ? 'Arama kriterlerinizi değiştirip tekrar deneyin'
            : 'Yeni kişiler ekleyerek sohbet etmeye başlayın'}
        </Text>
        {!searchQuery && (
          <TouchableOpacity style={styles.addButton} onPress={handleAddContact}>
            <UserPlusIcon size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Kişi Ekle</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [isLoading, searchQuery, handleAddContact]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kişiler</Text>
        <TouchableOpacity
          style={styles.addIconButton}
          onPress={handleAddContact}>
          <UserPlusIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MagnifyingGlassIcon size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Kişilerde ara..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      {/* Contacts List */}
      {isLoading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25D366" />
          <Text style={styles.loadingText}>Kişiler yükleniyor...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={item => item._id}
          style={styles.contactsList}
          contentContainerStyle={[
            styles.contactsListContent,
            filteredContacts.length === 0 && styles.emptyContainer,
          ]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#25D366']}
            />
          }
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

export default ContactsScreen;
