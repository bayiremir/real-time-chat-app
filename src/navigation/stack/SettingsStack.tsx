import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SettingsStackParamList} from '../types';
import SettingsScreen from '../../screens/tabs/SettingsScreen';
import ChatsScreen from '../../screens/drawer/ChatsScreen';
import SecurityScreen from '../../screens/drawer/SecurityScreen';
import StarChatScreen from '../../screens/drawer/StarChatScreen';
import ListDetailScreen from '../../screens/drawer/ListDetailScreen';
import ListScreen from '../../screens/drawer/ListScreen';
import BulkMessageScreen from '../../screens/drawer/BulkMessageScreen';
import ConnectedDevicesScreen from '../../screens/drawer/ConnectedDevicesScreen';
import ProfileListPickerScreen from '../../screens/other/ProfileListPickerScreen';
import NotificationsScreen from '../../screens/drawer/NotificationsScreen';

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen name="StarChatScreen" component={StarChatScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ListDetailScreen" component={ListDetailScreen} />
      <Stack.Screen name="BulkMessageScreen" component={BulkMessageScreen} />
      <Stack.Screen
        name="ConnectedDevicesScreen"
        component={ConnectedDevicesScreen}
      />
      <Stack.Screen
        name="ProfileListPickerScreen"
        component={ProfileListPickerScreen}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
