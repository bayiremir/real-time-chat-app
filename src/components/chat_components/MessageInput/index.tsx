import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Alert,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
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

interface MessageInputProps {
  chatId: string;
  onMessageSent?: () => void;
}

const MessageInput = ({chatId, onMessageSent}: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);
  const [sendMessage, {isLoading: isSendingMessage}] = useSendMessageMutation();
  const [sendFileMessage, {isLoading: isSendingFile}] =
    useSendMessageWithFileMutation();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await sendMessage({
        chatId,
        content: message.trim(),
        type: 'text',
      }).unwrap();

      setMessage('');
      textInputRef.current?.focus();
      onMessageSent?.();
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Hata', 'Mesaj gönderilemedi');
    }
  };

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
      <View style={styles.container}>
        <View style={[styles.inputContainer, isFocused && styles.inputFocused]}>
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
              onChangeText={setMessage}
              placeholder="Mesaj yazın..."
              placeholderTextColor="#8696a0"
              multiline
              maxLength={1000}
              editable={!isLoading}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
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
