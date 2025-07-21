import React, {useEffect, useRef, useCallback, useState} from 'react';
import {
  View,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Clipboard,
  ImageBackground,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {styles} from './styles';
import ChatHeader from '../../../components/chat_components/ChatHeader';
import MessageItem from '../../../components/chat_components/MessageItem';
import MessageInput from '../../../components/chat_components/MessageInput';
import MessageContextMenu from '../../../components/chat_components/MessageContextMenu';
import {
  useGetChatMessagesQuery,
  useMarkAllChatMessagesAsReadMutation,
} from '../../../redux/services/mobileApi';
import {RootStackParamList} from '../../../navigation/types';
import {RootState} from '../../../redux/store';
import {
  addToStarred,
  removeFromStarred,
  isMessageStarred,
} from '../../../redux/slices/starredMessagesSlice';
import {Message} from '../../../interfaces/api.interface';

type ChatDetailRouteProp = RouteProp<RootStackParamList, 'ChatDetailScreen'>;

const ChatDetailScreen = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const {chat} = route.params;
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Context menu state
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageRef, setMessageRef] = useState<any>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    string | null
  >(null);

  // API calls
  const {data: messagesData, refetch} = useGetChatMessagesQuery({
    chatId: chat._id,
    params: {page: 1, limit: 50},
  });

  const [markAllAsRead] = useMarkAllChatMessagesAsReadMutation();

  // Redux'tan starred messages state'ini al
  const starredMessagesState = useSelector(
    (state: RootState) => state.starredMessages,
  );

  // Context menu handlers
  const handleStar = useCallback(() => {
    if (!selectedMessage) return;

    const starred = isMessageStarred(
      {starredMessages: starredMessagesState},
      selectedMessage._id,
    );

    if (starred) {
      dispatch(removeFromStarred(selectedMessage._id));
      Alert.alert('Başarılı', 'Mesaj yıldızlılardan kaldırıldı');
    } else {
      dispatch(addToStarred(selectedMessage));
      Alert.alert('Başarılı', 'Mesaj yıldızlılara eklendi');
    }
  }, [selectedMessage, dispatch, starredMessagesState]);

  const handleReply = useCallback(() => {
    if (!selectedMessage) return;
    Alert.alert('Bilgi', 'Yanıtlama özelliği yakında eklenecek');
  }, [selectedMessage]);

  const handleForward = useCallback(() => {
    if (!selectedMessage) return;
    Alert.alert('Bilgi', 'İletme özelliği yakında eklenecek');
  }, [selectedMessage]);

  const handleCopy = useCallback(() => {
    if (!selectedMessage) return;
    Clipboard.setString(selectedMessage.content);
    Alert.alert('Başarılı', 'Mesaj panoya kopyalandı');
  }, [selectedMessage]);

  const handlePin = useCallback(() => {
    if (!selectedMessage) return;
    Alert.alert('Bilgi', 'Sabitleme özelliği yakında eklenecek');
  }, [selectedMessage]);

  const handleReport = useCallback(() => {
    if (!selectedMessage) return;
    Alert.alert('Bilgi', 'Şikayet özelliği yakında eklenecek');
  }, [selectedMessage]);

  const handleDelete = useCallback(() => {
    if (!selectedMessage) return;
    Alert.alert('Mesajı Sil', 'Bu mesajı silmek istediğinizden emin misiniz?', [
      {
        text: 'İptal',
        style: 'cancel',
      },
      {
        text: 'Sil',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Bilgi', 'Mesaj silme özelliği yakında eklenecek');
        },
      },
    ]);
  }, [selectedMessage]);

  // Uzun basma handler'ı
  const handleMessageLongPress = useCallback((message: Message, ref: any) => {
    setMessageRef(ref);
    setSelectedMessage(message);
    setHighlightedMessageId(message._id);
    setContextMenuVisible(true);
  }, []);

  // Improved scroll to bottom function
  const scrollToBottom = useCallback(
    (animated: boolean = true) => {
      if (
        flatListRef.current &&
        messagesData?.data &&
        messagesData.data.length > 0
      ) {
        // Multiple attempts with different delays to ensure reliable scrolling
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({animated});
        }, 100);

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({animated: false});
        }, 300);
      }
    },
    [messagesData?.data],
  );

  // Mark messages as read when screen opens
  useEffect(() => {
    markAllAsRead(chat._id);
  }, [chat._id, markAllAsRead]);

  // Scroll to bottom when messages are loaded or updated
  useEffect(() => {
    if (messagesData?.data && messagesData.data.length > 0) {
      scrollToBottom();
    }
  }, [messagesData?.data, scrollToBottom]);

  // Ensure scroll to bottom when component mounts and data is available
  useEffect(() => {
    if (messagesData?.data && messagesData.data.length > 0) {
      // Immediate scroll for initial load
      setTimeout(() => {
        scrollToBottom(false);
      }, 50);

      // Secondary scroll to ensure it's at bottom
      setTimeout(() => {
        scrollToBottom(true);
      }, 500);
    }
  }, [messagesData?.data, scrollToBottom]);

  const handleSendMessage = () => {
    // Refresh messages after sending
    refetch();
    // Scroll to bottom after sending message
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  };

  const renderMessage = ({item, index}: {item: any; index: number}) => {
    const isLastMessage = index === (messagesData?.data?.length || 0) - 1;
    const isHighlighted = highlightedMessageId === item._id;
    const isDimmed = contextMenuVisible && !isHighlighted;

    return (
      <MessageItem
        message={item}
        isLastMessage={isLastMessage}
        onLongPress={ref => handleMessageLongPress(item, ref)}
        isDimmed={isDimmed}
        isHighlighted={isHighlighted}
      />
    );
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <View style={styles.container}>
        <ChatHeader chat={chat} />

        <ImageBackground
          source={require('../../../../assets/images/chat-background.jpg')}
          style={[styles.chatContainer, {marginBottom: 60}]}>
          <FlatList
            ref={flatListRef}
            data={messagesData?.data || []}
            renderItem={renderMessage}
            keyExtractor={item => item._id}
            style={styles.messagesList}
            contentContainerStyle={[
              styles.messagesContainer,
              {paddingBottom: 50},
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
            onContentSizeChange={() => {
              // Ensure scroll to bottom when content size changes
              scrollToBottom(false);
            }}
            onLayout={() => {
              // Ensure scroll to bottom when layout is complete
              scrollToBottom(true);
            }}
          />
        </ImageBackground>

        {/* Overlay for context menu */}
        {contextMenuVisible && <View style={styles.contextMenuOverlay} />}

        <View
          style={[
            styles.inputWrapper,
            {paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10},
          ]}>
          <MessageInput chatId={chat._id} onMessageSent={handleSendMessage} />
        </View>
      </View>

      <MessageContextMenu
        visible={contextMenuVisible}
        onClose={() => {
          setContextMenuVisible(false);
          setSelectedMessage(null);
          setMessageRef(null);
          setHighlightedMessageId(null);
        }}
        onStar={handleStar}
        onReply={handleReply}
        onForward={handleForward}
        onCopy={handleCopy}
        onPin={handlePin}
        onReport={handleReport}
        onDelete={handleDelete}
        selectedMessage={selectedMessage}
        messageRef={messageRef}
        isStarred={
          selectedMessage
            ? isMessageStarred(
                {starredMessages: starredMessagesState},
                selectedMessage._id,
              )
            : false
        }
      />
    </KeyboardAvoidingView>
  );
};

export default ChatDetailScreen;
