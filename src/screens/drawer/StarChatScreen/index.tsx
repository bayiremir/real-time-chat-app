import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import ChatBubble from '../../../components/chat_components/ChatBubble';
import {Message} from '../../../interfaces/api.interface';
import {RootState} from '../../../redux/store';
import {RootStackParamList} from '../../../navigation/types';
import {
  removeFromStarred,
  addToStarred,
} from '../../../redux/slices/starredMessagesSlice';
import {
  useGetContactsQuery,
  useDeleteMessageMutation,
} from '../../../redux/services/mobileApi';
import {
  ArrowUpOnSquareIcon,
  ArrowUturnUpIcon,
  ChevronRightIcon,
  StarIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('tr-TR');
};

type StarChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'StarChatScreen'
>;

const StarChatScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StarChatScreenNavigationProp>();

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Redux'tan starred messages'ları al
  const starredMessages = useSelector(
    (state: RootState) => state.starredMessages.starredMessages,
  );

  // Kullanıcı bilgilerini al
  const {user} = useSelector((state: RootState) => state.userSlice);
  const currentUserId = user?._id || 'current_user_id';

  // API'den contacts'ları al
  const {data: contactsData} = useGetContactsQuery({page: 1, limit: 100});
  const contacts = contactsData?.data || [];

  // Delete message mutation
  const [deleteMessage] = useDeleteMessageMutation();

  const handleEditPress = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setSelectedItems([]); // Clear selections when exiting edit mode
    }
  };

  const handleSingleMessagePress = (message: Message) => {
    if (!isEditMode) {
      navigation.navigate('ForwardMessageModal', {
        message: message,
        contacts: contacts,
      });
    }
  };

  const handleMessageLongPress = (message: Message) => {
    if (!isEditMode) {
      const starred = starredMessages.some(msg => msg._id === message._id);
      const actionText = starred ? 'Yıldızdan Kaldır' : 'Yıldızla';

      Alert.alert(
        'Mesaj Seçenekleri',
        'Bu mesaj için ne yapmak istiyorsunuz?',
        [
          {
            text: 'İptal',
            style: 'cancel',
          },
          {
            text: actionText,
            onPress: () => {
              if (starred) {
                dispatch(removeFromStarred(message._id));
                Alert.alert('Başarılı', 'Mesaj yıldızlılardan kaldırıldı');
              } else {
                dispatch(addToStarred(message));
                Alert.alert('Başarılı', 'Mesaj yıldızlılara eklendi');
              }
            },
          },
        ],
      );
    }
  };

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelected = async (type: 'delete' | 'star' | 'forward') => {
    if (selectedItems.length === 0) return;

    if (type === 'delete') {
      Alert.alert(
        'Mesajları Sil',
        'Seçili mesajları silmek istediğinizden emin misiniz?',
        [
          {
            text: 'İptal',
            style: 'cancel',
          },
          {
            text: 'Sil',
            style: 'destructive',
            onPress: async () => {
              try {
                // Her seçili mesajı API'den sil
                await Promise.all(
                  selectedItems.map(messageId => deleteMessage(messageId)),
                );
                // Redux'tan da kaldır
                selectedItems.forEach(messageId => {
                  dispatch(removeFromStarred(messageId));
                });
                Alert.alert('Başarılı', 'Mesajlar silindi');
              } catch (error) {
                Alert.alert('Hata', 'Mesajlar silinemedi');
              }
              setSelectedItems([]);
              setIsEditMode(false);
            },
          },
        ],
      );
    } else if (type === 'star') {
      // Yıldızlı mesajları yıldızdan kaldır
      selectedItems.forEach(messageId => {
        dispatch(removeFromStarred(messageId));
      });
      Alert.alert('Başarılı', 'Mesajlar yıldızdan kaldırıldı');
      setSelectedItems([]);
      setIsEditMode(false);
    } else if (type === 'forward') {
      // İlk seçili mesajı al ve ForwardMessageModal'ı aç
      const firstSelectedMessage = starredMessages.find(
        msg => msg._id === selectedItems[0],
      );
      if (firstSelectedMessage) {
        navigation.navigate('ForwardMessageModal', {
          message: firstSelectedMessage,
          contacts: contacts,
        });
      }
      setSelectedItems([]);
      setIsEditMode(false);
    }
  };

  const renderItem = ({item}: {item: Message}) => {
    const isOwnMessage = item.sender._id === currentUserId;
    const isSelected = selectedItems.includes(item._id);

    return (
      <TouchableOpacity
        style={[styles.container, isSelected && styles.selectedContainer]}
        onPress={() =>
          isEditMode
            ? handleItemSelect(item._id)
            : handleSingleMessagePress(item)
        }>
        <View style={styles.leftContainer}>
          <View style={styles.userInfoContainer}>
            {isEditMode && (
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    isSelected && styles.checkboxSelected,
                  ]}>
                  {isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
              </View>
            )}
            <Image source={{uri: item.sender.avatar}} style={styles.image} />
            <Text>{`${item.sender.firstName} ${item.sender.lastName}`}</Text>
            <Text style={styles.timeText}>{formatDate(item.createdAt)}</Text>
          </View>
          <View style={styles.chatBubbleContainer}>
            <ChatBubble
              message={item}
              isOwnMessage={isOwnMessage}
              showSenderName={false}
              onPress={() => handleSingleMessagePress(item)}
              onLongPress={() => handleMessageLongPress(item)}
            />
            {!isEditMode && (
              <View style={styles.rightContainer}>
                <ChevronRightIcon size={20} color={'#808080'} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.divider} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <GoBackTabBar
        title="Yıldızlı"
        children={
          <TouchableOpacity onPress={handleEditPress}>
            <Text style={styles.editButtonText}>
              {isEditMode ? 'Bitti' : 'Düzenle'}
            </Text>
          </TouchableOpacity>
        }
      />
      <FlatList
        data={starredMessages}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={
          isEditMode && selectedItems.length > 0
            ? styles.flatListWithToolbar
            : undefined
        }
      />
      {isEditMode && selectedItems.length > 0 && (
        <View style={styles.deleteToolbar}>
          <View style={styles.deleteButton}>
            <TouchableOpacity
              style={styles.deleteButtonIcon}
              onPress={() => handleDeleteSelected('forward')}>
              <ArrowUturnUpIcon size={30} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButtonIcon}
              onPress={() => handleDeleteSelected('star')}>
              <StarIcon size={30} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButtonIcon}
              onPress={() => handleDeleteSelected('forward')}>
              <ArrowUpOnSquareIcon size={30} color="#808080" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButtonIcon}
              onPress={() => handleDeleteSelected('delete')}>
              <TrashIcon size={30} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default StarChatScreen;
