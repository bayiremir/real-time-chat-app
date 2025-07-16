import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CheckIcon} from 'react-native-heroicons/solid';
import {Message} from '../../../interfaces/api.interface';
import {styles} from './styles';

interface ChatBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  showSenderName?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isOwnMessage,
  showSenderName = false,
  onPress,
  onLongPress,
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const renderMessageStatus = () => {
    if (!isOwnMessage) return null;

    const hasReadBy = message.readBy && message.readBy.length > 0;
    const hasDeliveredTo =
      message.deliveredTo && message.deliveredTo.length > 0;

    if (hasReadBy) {
      // Message has been read - show blue double check
      return (
        <View style={styles.messageStatus}>
          <CheckIcon size={12} color="#4FC3F7" />
          <CheckIcon size={12} color="#4FC3F7" style={styles.doubleCheckIcon} />
        </View>
      );
    } else if (hasDeliveredTo) {
      // Message has been delivered - show gray double check
      return (
        <View style={styles.messageStatus}>
          <CheckIcon size={12} color="#9E9E9E" />
          <CheckIcon size={12} color="#9E9E9E" style={styles.doubleCheckIcon} />
        </View>
      );
    } else {
      // Message sent but not delivered - show single gray check
      return (
        <View style={styles.messageStatus}>
          <CheckIcon size={12} color="#9E9E9E" />
        </View>
      );
    }
  };

  const getSenderDisplayName = () => {
    if (!message.sender) return '';

    const sender = message.sender as any;
    if (sender.fullName) {
      return sender.fullName;
    }
    return `${sender.firstName} ${sender.lastName}`.trim();
  };

  return (
    <View
      style={[
        styles.container,
        isOwnMessage ? styles.ownContainer : styles.otherContainer,
      ]}>
      <TouchableOpacity
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}>
        {/* Sender name for group chats */}
        {showSenderName && !isOwnMessage && message.sender && (
          <Text style={styles.senderName}>{getSenderDisplayName()}</Text>
        )}

        {/* Message content */}
        {message.content && (
          <Text
            style={[
              styles.messageText,
              isOwnMessage ? styles.ownMessageText : styles.otherMessageText,
            ]}>
            {message.content}
          </Text>
        )}

        {/* Message footer with time and status */}
        <View style={styles.messageFooter}>
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

export default ChatBubble;
