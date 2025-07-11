import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface GoBackTabBarProps {
  title: string;
  children?: React.ReactNode;
}

const GoBackTabBar = ({title, children}: GoBackTabBarProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <View style={[styles.container, {paddingTop: statusBarHeight}]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <ChevronLeftIcon size={24} color="black" />
      </TouchableOpacity>
      <Text style={[styles.title, {top: statusBarHeight}]}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

export default GoBackTabBar;
