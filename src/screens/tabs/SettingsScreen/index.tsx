import React, {useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../redux/store';
import {useGetProfileQuery} from '../../../redux/services/mobileApi';
import {setTheme, setLanguage} from '../../../redux/slices/userSlice';
import {styles} from './styles';
import {
  BellIcon,
  ChevronRightIcon,
  StarIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ChatBubbleLeftIcon,
  UserPlusIcon,
  ListBulletIcon,
  MegaphoneIcon,
  ArrowsUpDownIcon,
  InformationCircleIcon,
} from 'react-native-heroicons/outline';
import TabBarWithout from '../../../components/tab_components/TabBarWithout';
import SearchBar from '../../../components/tab_components/SearchBar';

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
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
        </View>
      </View>
      <View style={styles.itemRight}>
        {rightComponent}
        {showArrow && onPress && <ChevronRightIcon size={16} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user, theme} = useSelector((state: RootState) => state.userSlice);

  const {data: profileData} = useGetProfileQuery();

  const currentUser = profileData?.data || user;

  const handleProfilePress = useCallback(() => {
    navigation.navigate('ProfileScreen' as never);
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

  const handleBlockedUsersPress = useCallback(() => {
    Alert.alert('Engellenen Kullanıcılar', 'Bu özellik yakında eklenecektir.');
  }, []);

  const handlePrivacyPress = useCallback(() => {
    Alert.alert('Gizlilik', 'Bu özellik yakında eklenecektir.');
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TabBarWithout />
      <Text style={styles.headerText}>Ayarlar</Text>
      <SearchBar />
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
              {currentUser?.bio && (
                <Text style={styles.profileBio} numberOfLines={1}>
                  {currentUser.bio}
                </Text>
              )}
            </View>
          </View>
          <ChevronRightIcon size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <SettingsItem
          icon={<ListBulletIcon size={24} color="black" />}
          title="Listeler"
          onPress={() => navigation.navigate('ListScreen' as never)}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<MegaphoneIcon size={24} color="black" />}
          title="Toplu Mesaj"
          onPress={handleBlockedUsersPress}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<StarIcon size={24} color="black" />}
          title="Yıldızlı"
          onPress={handlePrivacyPress}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<ComputerDesktopIcon size={24} color="black" />}
          title="Bağlı Cihazlar"
          onPress={handlePrivacyPress}
        />
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <SettingsItem
          icon={<UserCircleIcon size={24} color="black" />}
          title="Hesap"
          onPress={handleProfilePress}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<ShieldCheckIcon size={24} color="black" />}
          title="Gizlilik"
          onPress={handleNotificationsPress}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<ChatBubbleLeftIcon size={24} color="black" />}
          title="Sohbetler"
          onPress={handleNotificationsPress}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<BellIcon size={24} color="black" />}
          title="Bildirimler"
          onPress={handleNotificationsPress}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<ArrowsUpDownIcon size={24} color="black" />}
          title="Depolama ve Veri"
          onPress={handleNotificationsPress}
        />
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <SettingsItem
          icon={<InformationCircleIcon size={24} color="black" />}
          title="Yardım"
          onPress={handleThemeToggle}
        />
        <View style={styles.divider} />
        <SettingsItem
          icon={<UserPlusIcon size={24} color="black" />}
          title="Arkadaşlarınızı davet edin"
          onPress={handleLanguageChange}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
