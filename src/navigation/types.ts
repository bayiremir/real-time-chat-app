import {Chat, Message} from '../interfaces/api.interface';
import {ListItem} from '../interfaces/lists.interface';
import {User} from '../interfaces/api.interface';

export type RootStackParamList = {
  TabStack: undefined;
  ChatDetailScreen: {
    chat: Chat;
  };
  UserSearch: undefined;
  ContactsScreen: undefined;
  ProfileScreen: undefined;
  GroupChatCreation: undefined;
  Notifications: undefined;
  ReorderListModal: {
    lists: ListItem[];
  };
  CreateListModal: undefined;
  ContactSelectionModal: {
    contacts: User[];
    selectedMembers: User[];
    listId?: string; // For adding to existing list
    isCreatingList?: boolean; // For creating new list
  };
  AddMemberModal: {
    contacts: User[];
    listId: string;
    existingMembers: User[];
  };
  AddBulkModal: {
    contacts: User[];
  };
  ForwardMessageModal: {
    message: Message;
    contacts: User[];
  };
  ChatInfo: {
    chat: Chat;
  };
};

export type TabStackParamList = {
  ChatScreen: undefined;
  CallScreen: undefined;
  CommunityScreen: undefined;
  UpdateScreen: undefined;
  SettingsStack: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  ChatsScreen: undefined;
  SecurityScreen: undefined;
  StarChatScreen: undefined;
  ListScreen: undefined;
  ListDetailScreen: {
    list: ListItem;
  };
  BulkMessageScreen: undefined;
  ConnectedDevicesScreen: undefined;
  ProfileListPickerScreen: undefined;
  NotificationsScreen: undefined;
};
