import React from 'react';
import {FlatList} from 'react-native';
import ChatSection from '../ChatSection';
import {Chat} from '../../../interfaces/api.interface';
import {styles} from '../../../screens/tabs/ChatScreen/styles';

interface ChatsListProps {
  chats: Chat[];
}

export const ChatsList = ({chats}: ChatsListProps) => {
  return (
    <FlatList
      data={chats}
      renderItem={({item}) => <ChatSection chat={item} />}
      keyExtractor={item => item._id}
      showsVerticalScrollIndicator={false}
      style={styles.chatsContainer}
    />
  );
};
