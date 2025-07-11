import {Chat} from '../interfaces/api.interface';
import {ListItem} from '../interfaces/lists.interface';

export type RootStackParamList = {
  TabStack: undefined;
  ChatDetail: {
    chat: Chat;
  };
  UserSearch: undefined;
  ContactsScreen: undefined;
  ProfileScreen: undefined;
  GroupChatCreation: undefined;
  ChatInfo: {
    chat: Chat;
  };
  Notifications: undefined;
  ListScreen: undefined;
  ListDetailScreen: {
    list: ListItem;
  };
  BulkMessageScreen: undefined;
  StarChatScreen: undefined;
  ConnectedDevicesScreen: undefined;
};

export type TabStackParamList = {
  ChatScreen: undefined;
  CallScreen: undefined;
  CommunityScreen: undefined;
  UpdateScreen: undefined;
  SettingsScreen: undefined;
};
