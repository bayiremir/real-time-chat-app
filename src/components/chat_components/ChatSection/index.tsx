import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {styles} from './styles';
import {Chat} from '../../../interfaces/api.interface';
import {RootStackParamList} from '../../../navigation/types';

type ChatSectionNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TabStack'
>;

interface ChatProps {
  chat: Chat;
}

const ChatSection = ({chat}: ChatProps) => {
  const navigation = useNavigation<ChatSectionNavigationProp>();
  const otherParticipant = chat.participants.find(p => p.user !== null)?.user;

  if (!otherParticipant) {
    return null; // Don't render if no valid participant
  }

  const handleChatPress = () => {
    navigation.navigate('ChatDetail', {chat});
  };

  const formatLastActivity = (lastActivity: string) => {
    const date = new Date(lastActivity);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      // Today - show time
      return date.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } else if (diffInDays === 1) {
      return 'Dün';
    } else if (diffInDays < 7) {
      return date.toLocaleDateString('tr-TR', {weekday: 'long'});
    } else {
      return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleChatPress}>
      <View style={styles.avatarContainer}>
        <Image
          source={{uri: chat.participants[1].user?.avatar}}
          style={styles.avatar}
        />
        {chat.participants[1].user?.isOnline && (
          <View style={styles.onlineIndicator} />
        )}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName} numberOfLines={1}>
            {chat.participants[1].user?.fullName}
          </Text>
          <Text style={styles.lastActivity}>
            {formatLastActivity(chat.lastActivity)}
          </Text>
        </View>

        <View style={styles.chatFooter}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            Son mesaj burada görünecek...
          </Text>
          {/* <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>2</Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatSection;
