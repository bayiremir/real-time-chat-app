// Icon type definitions
export type IconType =
  | 'bell'
  | 'star'
  | 'computer'
  | 'user-circle'
  | 'shield'
  | 'chat'
  | 'user-plus'
  | 'list'
  | 'megaphone'
  | 'arrows-up-down'
  | 'information-circle';

// Interfaces
export interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
}

export interface SettingsItemData {
  id: string;
  iconType: IconType;
  title: string;
  action: string;
}

export interface SettingsSection {
  id: string;
  title?: string;
  items: SettingsItemData[];
}

// Settings Data
export const settingsData: SettingsSection[] = [
  {
    id: 'account',
    title: 'Hesap Ayarları',
    items: [
      {
        id: 'lists',
        iconType: 'list',
        title: 'Listeler',
        action: 'navigateToLists',
      },
      {
        id: 'bulkMessage',
        iconType: 'megaphone',
        title: 'Toplu Mesaj',
        action: 'handleBulkMessage',
      },
      {
        id: 'starred',
        iconType: 'star',
        title: 'Yıldızlı',
        action: 'handleStarred',
      },
      {
        id: 'connectedDevices',
        iconType: 'computer',
        title: 'Bağlı Cihazlar',
        action: 'handleConnectedDevices',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Gizlilik ve Güvenlik',
    items: [
      {
        id: 'account',
        iconType: 'user-circle',
        title: 'Hesap',
        action: 'navigateToProfile',
      },
      {
        id: 'privacy',
        iconType: 'shield',
        title: 'Gizlilik',
        action: 'handlePrivacy',
      },
      {
        id: 'chats',
        iconType: 'chat',
        title: 'Sohbetler',
        action: 'handleChats',
      },
      {
        id: 'notifications',
        iconType: 'bell',
        title: 'Bildirimler',
        action: 'navigateToNotifications',
      },
      {
        id: 'storageData',
        iconType: 'arrows-up-down',
        title: 'Depolama ve Veri',
        action: 'handleStorageData',
      },
    ],
  },
  {
    id: 'app',
    title: 'Uygulama Ayarları',
    items: [
      {
        id: 'help',
        iconType: 'information-circle',
        title: 'Yardım',
        action: 'handleHelp',
      },
      {
        id: 'inviteFriends',
        iconType: 'user-plus',
        title: 'Arkadaşlarınızı davet edin',
        action: 'handleInviteFriends',
      },
    ],
  },
];

// Action handlers type
export type SettingsActionHandlers = {
  navigateToLists: () => void;
  handleBulkMessage: () => void;
  handleStarred: () => void;
  handleConnectedDevices: () => void;
  navigateToProfile: () => void;
  handlePrivacy: () => void;
  handleChats: () => void;
  navigateToNotifications: () => void;
  handleStorageData: () => void;
  handleHelp: () => void;
  handleInviteFriends: () => void;
};

// Helper function to get action handler
export const getActionHandler = (
  action: string,
  handlers: SettingsActionHandlers,
): (() => void) | undefined => {
  return handlers[action as keyof SettingsActionHandlers];
};
