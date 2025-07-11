import {View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TabBarWithout = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return (
    <View style={[styles.container, {paddingTop: statusBarHeight}]}></View>
  );
};

export default TabBarWithout;
