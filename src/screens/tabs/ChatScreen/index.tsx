import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from './styles';
import TabBar from '../../../components/tab_components/TabBar';
import SearchBar from '../../../components/tab_components/SearchBar';
import {ListsSection} from '../../../components/chat_components/ListSelection/ListsSection';
import {ChatsList} from '../../../components/chat_components/ChatList/ChatsList';
import {useChatScreen} from '../../../hooks/useChatScreen';

const ChatScreen = () => {
  const {
    isLoading,
    listsWithAll,
    filteredChats,
    handleListSelect,
    isListSelected,
  } = useChatScreen();

  return (
    <View style={styles.container}>
      <TabBar />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.headerText}>Sohbetler</Text>
          <SearchBar />
          <ListsSection
            lists={listsWithAll}
            onListSelect={handleListSelect}
            isListSelected={isListSelected}
          />
          <ChatsList chats={filteredChats} />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
