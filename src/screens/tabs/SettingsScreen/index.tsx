import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../redux/store';
import {
  useGetProfileQuery,
  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useLogoutMutation,
} from '../../../redux/services/mobileApi';
import {
  logout,
  setTheme,
  setLanguage,
  setNotificationEnabled,
} from '../../../redux/slices/userSlice';
import {styles} from './styles';

// Icons
import {
  BellIcon,
  ShieldCheckIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  MoonIcon,
  SunIcon,
  LanguageIcon,
  ArrowLeftOnRectangleIcon,
  UsersIcon,
  NoSymbolIcon,
} from 'react-native-heroicons/outline';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightComponent,
  showArrow = true,
}) => {
  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.itemRight}>
        {rightComponent}
        {showArrow && onPress && <ArrowRightIcon size={16} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, theme, language, notificationEnabled} = useSelector(
    (state: RootState) => state.userSlice,
  );

  const {data: profileData} = useGetProfileQuery();
  const {data: notificationSettings} = useGetNotificationSettingsQuery();
  const [updateNotificationSettings] = useUpdateNotificationSettingsMutation();
  const [logoutMutation, {isLoading: isLoggingOut}] = useLogoutMutation();

  const [localNotifications, setLocalNotifications] = useState(
    notificationSettings?.data?.pushNotifications ?? notificationEnabled,
  );

  const currentUser = profileData?.data || user;

  const handleProfilePress = useCallback(() => {
    navigation.navigate('ProfileScreen' as never);
  }, [navigation]);

  const handleContactsPress = useCallback(() => {
    navigation.navigate('ContactsScreen' as never);
  }, [navigation]);

  const handleNotificationsPress = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  }, [theme, dispatch]);

  const handleLanguageChange = useCallback(() => {
    Alert.alert('Dil Seçimi', 'Hangi dili tercih edersiniz?', [
      {
        text: 'Türkçe',
        onPress: () => dispatch(setLanguage('tr')),
      },
      {
        text: 'English',
        onPress: () => dispatch(setLanguage('en')),
      },
      {text: 'İptal', style: 'cancel'},
    ]);
  }, [dispatch]);

  const handleNotificationToggle = useCallback(
    async (value: boolean) => {
      setLocalNotifications(value);
      dispatch(setNotificationEnabled(value));

      try {
        await updateNotificationSettings({
          pushNotifications: value,
        });
      } catch (error) {
        console.error('Failed to update notification settings:', error);
      }
    },
    [dispatch, updateNotificationSettings],
  );

  const handleBlockedUsersPress = useCallback(() => {
    Alert.alert('Engellenen Kullanıcılar', 'Bu özellik yakında eklenecektir.');
  }, []);

  const handlePrivacyPress = useCallback(() => {
    Alert.alert('Gizlilik', 'Bu özellik yakında eklenecektir.');
  }, []);

  const handleAboutPress = useCallback(() => {
    Alert.alert(
      'Hakkında',
      'WhatsApp Clone\nVersion 1.0.0\n\nBu uygulama eğitim amaçlı geliştirilmiştir.',
    );
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            try {
              await logoutMutation().unwrap();
              dispatch(logout());
            } catch (error) {
              // Even if server logout fails, clear local data
              dispatch(logout());
            }
          },
        },
      ],
    );
  }, [logoutMutation, dispatch]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ayarlar</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.profileSection}
          onPress={handleProfilePress}
          activeOpacity={0.7}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              {currentUser?.avatar ? (
                <Image
                  source={{uri: currentUser.avatar}}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.defaultAvatar}>
                  <Text style={styles.avatarText}>
                    {currentUser?.firstName?.[0]?.toUpperCase() || '?'}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>
                {currentUser?.firstName} {currentUser?.lastName}
              </Text>
              <Text style={styles.profilePhone}>{currentUser?.phone}</Text>
              {currentUser?.bio && (
                <Text style={styles.profileBio} numberOfLines={1}>
                  {currentUser.bio}
                </Text>
              )}
            </View>
          </View>
          <ArrowRightIcon size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap</Text>
        <SettingsItem
          icon={<UsersIcon size={24} color="#25D366" />}
          title="Kişilerim"
          subtitle="Kişi listesini yönet"
          onPress={handleContactsPress}
        />
        <SettingsItem
          icon={<NoSymbolIcon size={24} color="#EF4444" />}
          title="Engellenen Kullanıcılar"
          subtitle="Engellediğiniz kişileri görün"
          onPress={handleBlockedUsersPress}
        />
        <SettingsItem
          icon={<ShieldCheckIcon size={24} color="#3B82F6" />}
          title="Gizlilik"
          subtitle="Son görülme, profil fotoğrafı, durum"
          onPress={handlePrivacyPress}
        />
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bildirimler</Text>
        <SettingsItem
          icon={<BellIcon size={24} color="#F59E0B" />}
          title="Bildirimler"
          subtitle={localNotifications ? 'Açık' : 'Kapalı'}
          rightComponent={
            <Switch
              value={localNotifications}
              onValueChange={handleNotificationToggle}
              trackColor={{false: '#E5E7EB', true: '#86EFAC'}}
              thumbColor={localNotifications ? '#25D366' : '#9CA3AF'}
            />
          }
          showArrow={false}
        />
        <SettingsItem
          icon={<BellIcon size={24} color="#8B5CF6" />}
          title="Bildirim Geçmişi"
          subtitle="Tüm bildirimleri görün"
          onPress={handleNotificationsPress}
        />
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Uygulama</Text>
        <SettingsItem
          icon={
            theme === 'light' ? (
              <SunIcon size={24} color="#F59E0B" />
            ) : (
              <MoonIcon size={24} color="#6366F1" />
            )
          }
          title="Tema"
          subtitle={theme === 'light' ? 'Açık Tema' : 'Koyu Tema'}
          onPress={handleThemeToggle}
        />
        <SettingsItem
          icon={<LanguageIcon size={24} color="#10B981" />}
          title="Dil"
          subtitle={language === 'tr' ? 'Türkçe' : 'English'}
          onPress={handleLanguageChange}
        />
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diğer</Text>
        <SettingsItem
          icon={<InformationCircleIcon size={24} color="#6B7280" />}
          title="Hakkında"
          subtitle="Uygulama bilgileri"
          onPress={handleAboutPress}
        />
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoggingOut}
          activeOpacity={0.7}>
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <ArrowLeftOnRectangleIcon size={20} color="#FFFFFF" />
              <Text style={styles.logoutText}>Çıkış Yap</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
