import React, {useEffect, useCallback, useState, useRef} from 'react';
import {
  View,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Clipboard,
  ImageBackground,
} from 'react-native';
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
  const dispatch = useDispatch();
  const scrollViewRef = useRef<FlatList>(null);
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageRef, setMessageRef] = useState<any>(null);
  const [highlightedMessageId, setHighlightedMessageId] = useState<
    string | null
  >(null);
  const [inputHeight, setInputHeight] = useState(60);
  // Pagination için loading state
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const {data: messagesData} = useGetChatMessagesQuery({
    chatId: chat._id,
    params: {page: 1, limit: 50},
  });

  const [markAllAsRead] = useMarkAllChatMessagesAsReadMutation();

  const starredMessagesState = useSelector(
    (state: RootState) => state.starredMessages,
  );

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

  const handleMessageLongPress = useCallback((message: Message, ref: any) => {
    setMessageRef(ref);
    setSelectedMessage(message);
    setHighlightedMessageId(message._id);
    setContextMenuVisible(true);
  }, []);

  useEffect(() => {
    markAllAsRead(chat._id);
  }, [chat._id, markAllAsRead]);

  // Eski mesajları yükle (örnek fonksiyon, API ile entegre etmelisin)
  const loadOlderMessages = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    // Burada eski mesajları API'den çekip redux/store'a eklemelisin
    // await dispatch(fetchOlderMessages(chat._id, ...));
    setIsLoadingMore(false);
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
          style={[styles.chatContainer, {marginBottom: inputHeight}]}>
          <FlatList
            ref={scrollViewRef}
            data={messagesData?.data || []}
            renderItem={renderMessage}
            keyExtractor={item => item._id}
            style={styles.messagesList}
            contentContainerStyle={[
              styles.messagesContainer,
              {paddingTop: inputHeight},
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            inverted
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            removeClippedSubviews={true}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
            onEndReached={loadOlderMessages}
            onEndReachedThreshold={0.1}
          />
        </ImageBackground>

        {contextMenuVisible && <View style={styles.contextMenuOverlay} />}

        <MessageInput
          chatId={chat._id}
          onLayout={e => setInputHeight(e.nativeEvent.layout.height)}
        />
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
