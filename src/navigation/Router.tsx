import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabStack from './stack/TabStack';
import AuthStack from './stack/AuthStack';
import ChatDetailScreen from '../screens/chat/ChatDetailScreen';
import UserSearchScreen from '../screens/other/UserSearchScreen';
import GroupChatCreationScreen from '../screens/chat/GroupChatCreationScreen';
import ChatInfoScreen from '../screens/chat/ChatInfoScreen';
import NotificationsScreen from '../screens/other/NotificationsScreen';
import {RootState} from '../redux/store';
import {RootStackParamList} from './types';
import ListScreen from '../screens/drawer/ListScreen';
import ListDetailScreen from '../screens/drawer/ListDetailScreen';
import BulkMessageScreen from '../screens/drawer/BulkMessageScreen';
import StarChatScreen from '../screens/drawer/StarChatScreen';
import ConnectedDevicesScreen from '../screens/drawer/ConnectedDevicesScreen';
import ReorderListModal from '../screens/modals/ReorderListModal';
import CreateListModal from '../screens/modals/CreateListModal';
import ContactSelectionModal from '../screens/modals/ContactSelectionModal';
import AddMemberModal from '../screens/modals/AddMemberModal';
import AddBulkModal from '../screens/modals/AddBulkModal';
import ForwardMessageModal from '../screens/modals/ForwardMessageModal';
import ProfileScreen from '../screens/drawer/ProfileScreen';
import ContactsScreen from '../screens/drawer/ContactsScreen';
import SecurityScreen from '../screens/drawer/SecurityScreen';
import ProfileListPickerScreen from '../screens/other/ProfileListPickerScreen';

const Stack = createStackNavigator<RootStackParamList>();

const Router = () => {
  const {authLogin} = useSelector((state: RootState) => state.userSlice);

  if (!authLogin) {
    return <AuthStack />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TabStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabStack" component={TabStack} />
        <Stack.Screen
          name="ChatDetail"
          component={ChatDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="UserSearch"
          component={UserSearchScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ContactsScreen"
          component={ContactsScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="GroupChatCreation"
          component={GroupChatCreationScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ChatInfo"
          component={ChatInfoScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ListDetailScreen"
          component={ListDetailScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="BulkMessageScreen"
          component={BulkMessageScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="StarChatScreen"
          component={StarChatScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ConnectedDevicesScreen"
          component={ConnectedDevicesScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        {/* Modal screens */}
        <Stack.Screen
          name="ReorderListModal"
          component={ReorderListModal}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="CreateListModal"
          component={CreateListModal}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="ContactSelectionModal"
          component={ContactSelectionModal}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AddMemberModal"
          component={AddMemberModal}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AddBulkModal"
          component={AddBulkModal}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="ForwardMessageModal"
          component={ForwardMessageModal}
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="SecurityScreen"
          component={SecurityScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="ProfileListPickerScreen"
          component={ProfileListPickerScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
