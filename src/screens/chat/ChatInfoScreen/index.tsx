import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Switch,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {
  useGetChatByIdQuery,
  useLeaveChatMutation,
  useDeleteChatByIdMutation,
  useUpdateChatSettingsMutation,
} from '../../../redux/services/mobileApi';
import {RootStackParamList} from '../../../navigation/types';

// Icons
import {
  ArrowLeftIcon,
  UserGroupIcon,
  BellIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon,
  CameraIcon,
} from 'react-native-heroicons/outline';
import {styles} from './styles';

type ChatInfoRouteProp = RouteProp<RootStackParamList, 'ChatInfo'>;

const ChatInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatInfoRouteProp>();
  const {chat: initialChat} = route.params;

  const [muteNotifications, setMuteNotifications] = useState(false);

  const {data: chatData} = useGetChatByIdQuery(initialChat._id);
  const [leaveChat, {isLoading: isLeaving}] = useLeaveChatMutation();
  const [deleteChat, {isLoading: isDeleting}] = useDeleteChatByIdMutation();
  const [updateChatSettings] = useUpdateChatSettingsMutation();

  const chat = chatData?.data || initialChat;
  const isGroupChat = chat.type === 'group';

  // Get chat display name
  const getChatName = () => {
    if (isGroupChat) {
      return 'Grup'; // For now, until API supports group names
    }
    const otherParticipant = chat.participants.find(p => p.user !== null)?.user;
    return otherParticipant?.fullName || 'İsimsiz';
  };

  const chatName = getChatName();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleEditGroupName = useCallback(() => {
    Alert.alert('Grup Adını Düzenle', 'Bu özellik yakında eklenecektir.');
  }, []);

  const handleChangeGroupPhoto = useCallback(() => {
    Alert.alert(
      'Grup Fotoğrafını Değiştir',
      'Bu özellik yakında eklenecektir.',
    );
  }, []);

  const handleMuteToggle = useCallback(
    async (value: boolean) => {
      setMuteNotifications(value);
      try {
        await updateChatSettings({
          chatId: chat._id,
          data: {muteNotifications: value},
        });
      } catch (error) {
        console.error('Failed to update mute settings:', error);
      }
    },
    [chat._id, updateChatSettings],
  );

  const handleLeaveGroup = useCallback(() => {
    Alert.alert(
      'Gruptan Ayrıl',
      'Bu gruptan ayrılmak istediğinizden emin misiniz?',
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Ayrıl',
          style: 'destructive',
          onPress: async () => {
            try {
              await leaveChat(chat._id).unwrap();
              navigation.navigate('TabStack' as never);
            } catch (error) {
              Alert.alert('Hata', 'Gruptan ayrılırken bir hata oluştu');
            }
          },
        },
      ],
    );
  }, [chat._id, leaveChat, navigation]);

  const handleDeleteChat = useCallback(() => {
    const actionText = isGroupChat ? 'grubu sil' : 'sohbeti sil';
    const confirmText = isGroupChat ? 'Grubu Sil' : 'Sohbeti Sil';

    Alert.alert(
      confirmText,
      `Bu ${actionText}mek istediğinizden emin misiniz?`,
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: confirmText,
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteChat(chat._id).unwrap();
              navigation.navigate('TabStack' as never);
            } catch (error) {
              Alert.alert('Hata', `${confirmText} sırasında bir hata oluştu`);
            }
          },
        },
      ],
    );
  }, [chat._id, isGroupChat, deleteChat, navigation]);

  const renderParticipant = useCallback(({item}: {item: any}) => {
    const user = item.user;
    if (!user) return null;

    return (
      <View style={styles.participantItem}>
        <View style={styles.participantInfo}>
          {user.avatar ? (
            <Image
              source={{uri: user.avatar}}
              style={styles.participantAvatar}
            />
          ) : (
            <View style={styles.defaultParticipantAvatar}>
              <Text style={styles.participantAvatarText}>
                {user.firstName[0]?.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.participantDetails}>
            <Text style={styles.participantName}>
              {user.firstName} {user.lastName}
            </Text>
            <Text style={styles.participantPhone}>
              {user.phone || 'Telefon yok'}
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ArrowLeftIcon size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isGroupChat ? 'Grup Bilgileri' : 'İletişim Bilgileri'}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Chat Info Section */}
      <View style={styles.chatInfoSection}>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={isGroupChat ? handleChangeGroupPhoto : undefined}
          disabled={!isGroupChat}>
          {chat.avatar ? (
            <Image source={{uri: chat.avatar}} style={styles.chatAvatar} />
          ) : (
            <View style={styles.defaultChatAvatar}>
              {isGroupChat ? (
                <UserGroupIcon size={40} color="#FFFFFF" />
              ) : (
                <Text style={styles.chatAvatarText}>
                  {chatName[0]?.toUpperCase() || '?'}
                </Text>
              )}
            </View>
          )}
          {isGroupChat && (
            <View style={styles.cameraIcon}>
              <CameraIcon size={16} color="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.chatDetails}>
          <View style={styles.chatNameContainer}>
            <Text style={styles.chatName}>{chatName}</Text>
            {isGroupChat && (
              <TouchableOpacity onPress={handleEditGroupName}>
                <PencilIcon size={16} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          {isGroupChat && (
            <Text style={styles.participantCount}>
              {chat.participants?.length || 0} katılımcı
            </Text>
          )}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ayarlar</Text>
        <View style={styles.settingItem}>
          <BellIcon size={24} color="#F59E0B" />
          <Text style={styles.settingText}>Sessiz</Text>
          <Switch
            value={muteNotifications}
            onValueChange={handleMuteToggle}
            trackColor={{false: '#E5E7EB', true: '#86EFAC'}}
            thumbColor={muteNotifications ? '#25D366' : '#9CA3AF'}
          />
        </View>
      </View>

      {/* Participants (Group only) */}
      {isGroupChat && chat.participants && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Katılımcılar ({chat.participants.length})
          </Text>
          <FlatList
            data={chat.participants}
            renderItem={renderParticipant}
            keyExtractor={item => item._id}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Actions */}
      <View style={styles.section}>
        {isGroupChat && (
          <TouchableOpacity
            style={styles.actionItem}
            onPress={handleLeaveGroup}
            disabled={isLeaving}>
            <ArrowRightOnRectangleIcon size={24} color="#EF4444" />
            <Text style={[styles.actionText, styles.destructiveText]}>
              Gruptan Ayrıl
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.actionItem}
          onPress={handleDeleteChat}
          disabled={isDeleting}>
          <TrashIcon size={24} color="#EF4444" />
          <Text style={[styles.actionText, styles.destructiveText]}>
            {isGroupChat ? 'Grubu Sil' : 'Sohbeti Sil'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChatInfoScreen;
