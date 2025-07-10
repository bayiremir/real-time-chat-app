import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

/**
 * Navigation Interfaces for WhatsApp-style Chat Application
 *
 * Usage Example:
 * import {LoginScreenNavigationProp} from '../../interfaces/navigation.interface';
 *
 * const navigation = useNavigation<LoginScreenNavigationProp>();
 * navigation.navigate('RegisterScreen');
 */

// Auth Stack Parameter List
export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  EntryCodeScreen: {
    phoneNumber: string;
  };
};

// Tab Stack Parameter List
export type TabStackParamList = {
  ChatScreen: undefined;
  UpdateScreen: undefined;
  CallScreen: undefined;
  CommunityScreen: undefined;
  SettingsScreen: undefined;
};

// Root Stack Parameter List (for overall navigation)
export type RootStackParamList = {
  AuthStack: undefined;
  TabStack: undefined;
};

// Navigation Props Types
export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type TabStackNavigationProp<T extends keyof TabStackParamList> =
  BottomTabNavigationProp<TabStackParamList, T>;

// Screen-specific navigation props
export type LoginScreenNavigationProp = AuthStackNavigationProp<'LoginScreen'>;
export type RegisterScreenNavigationProp =
  AuthStackNavigationProp<'RegisterScreen'>;
export type EntryCodeScreenNavigationProp =
  AuthStackNavigationProp<'EntryCodeScreen'>;
export type ChatScreenNavigationProp = TabStackNavigationProp<'ChatScreen'>;
