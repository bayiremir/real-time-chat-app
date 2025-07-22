import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  Alert,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  PlusIcon,
} from 'react-native-heroicons/outline';
import {styles} from './styles';
import {
  useSendMessageMutation,
  useSendMessageWithFileMutation,
} from '../../../redux/services/mobileApi';
import {useSocket} from '../../../hooks/useSocket';

interface MessageInputProps {
  chatId: string;
  onMessageSent?: () => void;
  onLayout?: (e: LayoutChangeEvent) => void;
  useSocket?: boolean; // Option to use socket or API
}

const MessageInput = ({
  chatId,
  onMessageSent,
  onLayout,
  useSocket: useSocketForSending = true,
}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textInputRef = useRef<TextInput>(null);
  const [sendMessage, {isLoading: isSendingMessage}] = useSendMessageMutation();
  const [sendFileMessage, {isLoading: isSendingFile}] =
    useSendMessageWithFileMutation();

  // Socket integration
  const {
    connected: socketConnected,
    sendMessage: socketSendMessage,
    startTyping,
    stopTyping,
  } = useSocket();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const messageContent = message.trim();

    // Clear input immediately for better UX
    setMessage('');

    // Stop typing indicator
    if (isTyping && socketConnected && useSocketForSending) {
      stopTyping({chatId});
      setIsTyping(false);
    }

    try {
      if (useSocketForSending && socketConnected) {
        // Send via socket for real-time delivery

        socketSendMessage({
          chatId,
          content: messageContent,
          type: 'text',
        });
      } else {
        await sendMessage({
          chatId,
          content: messageContent,
          type: 'text',
        }).unwrap();
      }

      textInputRef.current?.focus();
      onMessageSent?.();
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Hata', 'Mesaj gönderilemedi');
      // Restore message on error
      setMessage(messageContent);
    }
  };

  const handleTyping = (text: string) => {
    setMessage(text);

    if (!useSocketForSending || !socketConnected) return;

    // Start typing indicator
    if (!isTyping && text.length > 0) {
      startTyping({chatId});
      setIsTyping(true);
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing after 3 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        stopTyping({chatId});
        setIsTyping(false);
      }
    }, 3000);
  };

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (isTyping && socketConnected && useSocketForSending) {
        stopTyping({chatId});
      }
    };
  }, [isTyping, socketConnected, useSocketForSending, stopTyping, chatId]);

  const handleMicrophonePress = () => {
    // Ses kaydı için placeholder
    Alert.alert('Ses Kaydı', 'Ses kaydı özelliği henüz implementde edilmedi');
  };

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
      },
      response => {
        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          sendImageFile(asset);
        }
      },
    );
  };

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (result[0]) {
        sendDocumentFile(result[0]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // User cancelled
      } else {
        console.error('Document picker error:', error);
      }
    }
  };

  const sendImageFile = async (asset: any) => {
    const formData = new FormData();
    formData.append('chatId', chatId);
    formData.append('type', 'image');
    formData.append('file', {
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName || 'image.jpg',
    } as any);

    try {
      await sendFileMessage(formData).unwrap();
      onMessageSent?.();
    } catch (error) {
      console.error('Error sending image:', error);
      Alert.alert('Hata', 'Resim gönderilemedi');
    }
  };

  const sendDocumentFile = async (document: any) => {
    const formData = new FormData();
    formData.append('chatId', chatId);
    formData.append('type', 'document');
    formData.append('file', {
      uri: document.uri,
      type: document.type,
      name: document.name,
    } as any);

    try {
      await sendFileMessage(formData).unwrap();
      onMessageSent?.();
    } catch (error) {
      console.error('Error sending document:', error);
      Alert.alert('Hata', 'Dosya gönderilemedi');
    }
  };

  const showAttachmentOptions = () => {
    Alert.alert('Dosya Ekle', 'Hangi türde dosya eklemek istiyorsunuz?', [
      {text: 'Fotoğraf', onPress: handleImagePicker},
      {text: 'Dosya', onPress: handleDocumentPicker},
      {text: 'İptal', style: 'cancel'},
    ]);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isLoading = isSendingMessage || isSendingFile;
  const hasMessage = message.trim().length > 0;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container} onLayout={onLayout}>
        <View style={styles.inputContainer}>
          <Pressable
            style={({pressed}) => [
              styles.attachButton,
              pressed && styles.attachButtonPressed,
              isLoading && styles.buttonDisabled,
            ]}
            onPress={showAttachmentOptions}
            disabled={isLoading}>
            <PlusIcon size={24} color={isLoading ? '#a7a7a7' : '#8696a0'} />
          </Pressable>

          <View style={styles.textInputContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.textInput}
              value={message}
              onChangeText={handleTyping}
              placeholder="Mesaj yazın..."
              placeholderTextColor="#8696a0"
              multiline
              maxLength={1000}
              editable={!isLoading}
              returnKeyType="send"
              onSubmitEditing={hasMessage ? handleSendMessage : undefined}
              blurOnSubmit={false}
              enablesReturnKeyAutomatically={true}
            />
          </View>

          {hasMessage ? (
            <Pressable
              style={({pressed}) => [
                styles.sendButton,
                pressed && styles.sendButtonPressed,
                isLoading && styles.sendButtonDisabled,
              ]}
              onPress={handleSendMessage}
              disabled={isLoading}>
              <PaperAirplaneIcon size={24} color="#ffffff" />
            </Pressable>
          ) : (
            <Pressable
              style={({pressed}) => [
                styles.microphoneButton,
                pressed && styles.microphoneButtonPressed,
                isLoading && styles.buttonDisabled,
              ]}
              onPress={handleMicrophonePress}
              disabled={isLoading}>
              <MicrophoneIcon
                size={24}
                color={isLoading ? '#a7a7a7' : '#8696a0'}
              />
            </Pressable>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MessageInput;
