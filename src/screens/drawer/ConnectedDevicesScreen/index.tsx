import {View} from 'react-native';
import React from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';

const ConnectedDevicesScreen = () => {
  return (
    <View style={styles.container}>
      <GoBackTabBar title="Bağlı Cihazlar" />
    </View>
  );
};

export default ConnectedDevicesScreen;
