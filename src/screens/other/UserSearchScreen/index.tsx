import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  useSearchUsersQuery,
  useAddContactMutation,
  useCreateChatMutation,
} from '../../../redux/services/mobileApi';
import {User} from '../../../interfaces/api.interface';
import {styles} from './styles';

import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';

interface UserActionProps {
  user: User;
  onAddContact: (userId: string) => void;
  onStartChat: (user: User) => void;
  isAddingContact: boolean;
}

const UserAction: React.FC<UserActionProps> = ({
  user,
  onAddContact,
  onStartChat,
  isAddingContact,
}) => {
  return (
    <View style={styles.userActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => onStartChat(user)}
        activeOpacity={0.7}>
        <ChatBubbleLeftRightIcon size={20} color="#25D366" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.addButton]}
        onPress={() => onAddContact(user._id)}
        disabled={isAddingContact}
        activeOpacity={0.7}>
        {isAddingContact ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <UserPlusIcon size={20} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const UserSearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [addingUsers, setAddingUsers] = useState<Set<string>>(new Set());

  const {
    data: searchResults,
    isLoading,
    isFetching,
  } = useSearchUsersQuery(
    {q: searchQuery, page: 1, limit: 50},
    {skip: searchQuery.trim().length < 2},
  );

  const [addContact] = useAddContactMutation();
  const [createChat] = useCreateChatMutation();

  const users = searchResults?.data || [];

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAddContact = useCallback(
    async (userId: string) => {
      setAddingUsers(prev => new Set(prev).add(userId));

      try {
        const result = await addContact({userId}).unwrap();

        if (result.success) {
          Alert.alert('Başarılı', 'Kişi listesine eklendi', [
            {
              text: 'Tamam',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        }
      } catch (error: any) {
        if (error.status === 409) {
          Alert.alert('Bilgi', 'Bu kişi zaten listenizde mevcut');
        } else {
          Alert.alert('Hata', 'Kişi eklenirken bir hata oluştu');
        }
      } finally {
        setAddingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      }
    },
    [addContact, navigation],
  );

  const handleStartChat = useCallback(
    async (user: User) => {
      try {
        const result = await createChat({
          type: 'private',
          participants: [user._id],
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

  const renderUserItem = useCallback(
    ({item}: {item: User}) => (
      <View style={styles.userItem}>
        <View style={styles.userInfo}>
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

          <View style={styles.userDetails}>
            <Text style={styles.userName}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.userPhone}>{item.phone}</Text>
            {item.bio && (
              <Text style={styles.userBio} numberOfLines={1}>
                {item.bio}
              </Text>
            )}
          </View>
        </View>

        <UserAction
          user={item}
          onAddContact={handleAddContact}
          onStartChat={handleStartChat}
          isAddingContact={addingUsers.has(item._id)}
        />
      </View>
    ),
    [handleAddContact, handleStartChat, addingUsers],
  );

  const renderEmptyState = useCallback(() => {
    if (isLoading || isFetching) return null;

    if (searchQuery.trim().length < 2) {
      return (
        <View style={styles.emptyState}>
          <MagnifyingGlassIcon size={64} color="#9CA3AF" />
          <Text style={styles.emptyStateTitle}>Kişi Ara</Text>
          <Text style={styles.emptyStateSubtitle}>
            Yeni kişiler eklemek için en az 2 karakter girin
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <MagnifyingGlassIcon size={64} color="#9CA3AF" />
        <Text style={styles.emptyStateTitle}>Sonuç bulunamadı</Text>
        <Text style={styles.emptyStateSubtitle}>
          Arama kriterlerinizi değiştirip tekrar deneyin
        </Text>
      </View>
    );
  }, [isLoading, isFetching, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kişi Ekle</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MagnifyingGlassIcon size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="İsim, telefon numarası ara..."
            placeholderTextColor="#9CA3AF"
            autoFocus
          />
        </View>
      </View>

      {/* Search Results */}
      {(isLoading || isFetching) && searchQuery.trim().length >= 2 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#25D366" />
          <Text style={styles.loadingText}>Aranıyor...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUserItem}
          keyExtractor={item => item._id}
          style={styles.usersList}
          contentContainerStyle={[
            styles.usersListContent,
            users.length === 0 && styles.emptyContainer,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

export default UserSearchScreen;
