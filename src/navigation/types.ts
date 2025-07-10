import {Chat} from '../interfaces/api.interface';

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
};

export type TabStackParamList = {
  ChatScreen: undefined;
  CallScreen: undefined;
  CommunityScreen: undefined;
  UpdateScreen: undefined;
  SettingsScreen: undefined;
};
