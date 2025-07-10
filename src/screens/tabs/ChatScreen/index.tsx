import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import TabBar from '../../../components/tab_components/TabBar';
import SearchBar from '../../../components/tab_components/SearchBar';
import {useListChatsQuery} from '../../../redux/services/mobileApi';
import ChatSection from '../../../components/chat_components/ChatSection';

const ChatScreen = () => {
  const {data, isLoading} = useListChatsQuery({});
  return (
    <View style={styles.container}>
      <TabBar />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.content}>
          <Text style={styles.headerText}>Sohbetler</Text>
          <SearchBar />
          <FlatList
            data={data?.data}
            renderItem={({item}) => <ChatSection chat={item} />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: '#ffffff'}}
          />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
