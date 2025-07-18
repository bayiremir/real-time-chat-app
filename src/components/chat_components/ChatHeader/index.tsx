import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ArrowLeftIcon,
  PhoneIcon,
  VideoCameraIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import {Chat} from '../../../interfaces/api.interface';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader = ({chat}: ChatHeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  // Get the other participant
  const otherParticipant = chat.participants.find(p => p.user !== null)?.user;

  if (!otherParticipant) {
    return null;
  }

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleUserPress = () => {
    // Navigate to user profile or chat info
    console.log('Navigate to chat info');
  };

  return (
    <View style={[styles.container, {paddingTop: statusBarHeight}]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <ArrowLeftIcon size={24} color="#ffffff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.userInfo}
        onPress={handleUserPress}
        activeOpacity={0.7}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: chat.participants[1].user?.avatar}}
            style={styles.avatar}
          />
          {chat.participants[1].user?.isOnline && (
            <View style={styles.onlineIndicator} />
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {chat.participants[1].user?.fullName}
          </Text>
          <Text style={styles.status} numberOfLines={1}>
            {chat.participants[1].user?.isOnline
              ? 'Çevrimiçi'
              : 'Son görülme yakın zamanda'}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <PhoneIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <VideoCameraIcon size={20} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <EllipsisVerticalIcon size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
