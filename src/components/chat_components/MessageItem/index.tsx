import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckIcon} from 'react-native-heroicons/solid';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import {Message} from '../../../interfaces/api.interface';
import {RootState} from '../../../redux/store';

interface MessageItemProps {
  message: Message;
  isLastMessage?: boolean;
  onPress?: () => void;
  onLongPress?: (ref: any) => void;
  isDimmed?: boolean;
  isHighlighted?: boolean;
}

const MessageItem = ({
  message,
  isLastMessage,
  onPress,
  onLongPress,
  isDimmed = false,
  isHighlighted = false,
}: MessageItemProps) => {
  const touchableRef = useRef<View>(null);
  const {user} = useSelector((state: RootState) => state.userSlice);

  // Check if the message is from the current user
  const isOwnMessage = message.sender?._id === user?._id;

  const handleLongPress = () => {
    if (touchableRef.current && onLongPress) {
      onLongPress(touchableRef);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderMessageStatus = () => {
    if (!isOwnMessage) return null;

    return (
      <View style={styles.messageStatus}>
        {message.readBy && message.readBy.length > 0 ? (
          <View style={{flexDirection: 'row', marginLeft: -4}}>
            <CheckIcon size={12} color="#4CAF50" />
            <CheckIcon size={12} color="#4CAF50" style={{marginLeft: -8}} />
          </View>
        ) : (
          <CheckIcon size={12} color="#666666" />
        )}
      </View>
    );
  };

  const renderFileMessage = () => {
    // File messages will be implemented later when API interface is updated
    return null;

    // if (!message.file) return null;
    // return (
    //   <View style={styles.fileContainer}>
    //     {message.file.type.startsWith('image/') ? (
    //       <Image
    //         source={{uri: message.file.url}}
    //         style={styles.messageImage}
    //         resizeMode="cover"
    //       />
    //     ) : (
    //       <View style={styles.fileInfo}>
    //         <Text style={styles.fileName}>{message.file.originalName}</Text>
    //         <Text style={styles.fileSize}>
    //           {Math.round(message.file.size / 1024)} KB
    //         </Text>
    //       </View>
    //     )}
    //   </View>
    // );
  };

  return (
    <View
      style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage,
        isLastMessage && styles.lastMessage,
      ]}>
      <TouchableOpacity
        ref={touchableRef}
        style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
          isDimmed && !isHighlighted && styles.dimmedMessage,
        ]}
        activeOpacity={0.7}
        onPress={onPress}
        onLongPress={handleLongPress}>
        {!isOwnMessage && message.sender && (
          <Text style={styles.senderName}>
            {(message.sender as any).fullName ||
              `${(message.sender as any).firstName} ${
                (message.sender as any).lastName
              }`}
          </Text>
        )}

        {renderFileMessage()}

        {message.content && (
          <Text
            style={[
              styles.messageText,
              isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
            ]}>
            {message.content}
          </Text>
        )}

        <View
          style={[
            styles.messageFooter,
            isOwnMessage ? styles.ownMessageFooter : styles.otherMessageFooter,
          ]}>
          <Text
            style={[
              styles.messageTime,
              isOwnMessage ? styles.ownMessageTime : styles.otherMessageTime,
            ]}>
            {formatTime(message.createdAt)}
          </Text>
          {renderMessageStatus()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MessageItem;
