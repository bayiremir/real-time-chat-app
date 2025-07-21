import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ChevronLeftIcon,
  PhoneIcon,
  VideoCameraIcon,
} from 'react-native-heroicons/outline';
import {Chat} from '../../../interfaces/api.interface';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader = ({chat}: ChatHeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const {user} = useSelector((state: RootState) => state.userSlice);

  // Find the other participant (not the current user)
  const otherParticipant = chat.participants.find(
    p => p.user !== null && p.user._id !== user?._id,
  )?.user;

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
        <ChevronLeftIcon size={24} color="#000000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.userInfo}
        onPress={handleUserPress}
        activeOpacity={0.7}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: otherParticipant.avatar || ''}}
            style={styles.avatar}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.userName} numberOfLines={1}>
            {`${otherParticipant.firstName} ${otherParticipant.lastName}`.trim()}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <VideoCameraIcon size={24} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <PhoneIcon size={20} color="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatHeader;
