import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabStackParamList} from '../types';
import ChatScreen from '../../screens/tabs/ChatScreen';
import UpdateScreen from '../../screens/tabs/UpdateScreen';
import CallScreen from '../../screens/tabs/CallScreen';
import CommunityScreen from '../../screens/tabs/CommunityScreen';
import SettingsStack from './SettingsStack';

// Heroicons import
import {
  ArrowPathIcon,
  PhoneIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
} from 'react-native-heroicons/solid';

const Stack = createBottomTabNavigator<TabStackParamList>();

const TabStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#25D366',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#f0f0f0',
          borderTopWidth: 0.5,
          borderTopColor: '#E5E5E5',
        },
      }}>
      <Stack.Screen
        name="UpdateScreen"
        component={UpdateScreen}
        options={{
          tabBarLabel: 'Güncellemeler',
          tabBarIcon: ({color, size}) => (
            <ArrowPathIcon size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="CallScreen"
        component={CallScreen}
        options={{
          tabBarLabel: 'Aramalar',
          tabBarIcon: ({color, size}) => (
            <PhoneIcon size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="CommunityScreen"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Topluluk',
          tabBarIcon: ({color, size}) => (
            <UserGroupIcon size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Sohbetler',
          tabBarIcon: ({color, size}) => (
            <ChatBubbleLeftRightIcon size={size} color={color} />
          ),
        }}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Ayarlar',
          tabBarIcon: ({color, size}) => <CogIcon size={size} color={color} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default TabStack;
