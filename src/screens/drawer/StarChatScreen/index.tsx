import {View} from 'react-native';
import React from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';

const StarChatScreen = () => {
  return (
    <View style={styles.container}>
      <GoBackTabBar title="Yıldızlı Mesajlar" />
    </View>
  );
};

export default StarChatScreen;
