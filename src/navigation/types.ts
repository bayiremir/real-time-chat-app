import {Chat, Message} from '../interfaces/api.interface';
import {ListItem} from '../interfaces/lists.interface';
import {User} from '../interfaces/api.interface';

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
  // Modal screens converted from BottomSheets
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
  SecurityScreen: undefined;
  ProfileListPickerScreen: undefined;
};

export type TabStackParamList = {
  ChatScreen: undefined;
  CallScreen: undefined;
  CommunityScreen: undefined;
  UpdateScreen: undefined;
  SettingsScreen: undefined;
};
