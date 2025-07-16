import React, {useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {RootState} from '../../../redux/store';
import {useGetProfileQuery} from '../../../redux/services/mobileApi';
import {styles} from './styles';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import TabBarWithout from '../../../components/tab_components/TabBarWithout';
import SearchBar from '../../../components/tab_components/SearchBar';
import {
  SettingsItem,
  getIconComponent,
} from '../../../components/settings_components/SettingsItem/SettingsItem';
import {
  settingsData,
  SettingsActionHandlers,
  getActionHandler,
} from '../../../utils/SettingsItem';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: RootState) => state.userSlice);

  const {data: profileData} = useGetProfileQuery();

  const currentUser = profileData?.data || user;

  const handleProfilePress = useCallback(() => {
    navigation.navigate('ProfileScreen' as never);
  }, [navigation]);

  const handleNotificationsPress = useCallback(() => {
    navigation.navigate('Notifications' as never);
  }, [navigation]);

  const handleGenericAlert = useCallback((title: string) => {
    Alert.alert(title, 'Bu özellik yakında eklenecektir.');
  }, []);

  // Action handlers object
  const actionHandlers: SettingsActionHandlers = {
    navigateToLists: useCallback(() => {
      navigation.navigate('ListScreen' as never);
    }, [navigation]),

    handleBulkMessage: useCallback(() => {
      navigation.navigate('BulkMessageScreen' as never);
    }, [navigation]),

    handleStarred: useCallback(() => {
      navigation.navigate('StarChatScreen' as never);
    }, [navigation]),

    handleConnectedDevices: useCallback(() => {
      navigation.navigate('ConnectedDevicesScreen' as never);
    }, [navigation]),

    navigateToProfile: handleProfilePress,

    handleSecurity: useCallback(() => {
      navigation.navigate('SecurityScreen' as never);
    }, [navigation]),

    handleChats: useCallback(() => {
      handleGenericAlert('Sohbetler');
    }, [handleGenericAlert]),

    navigateToNotifications: handleNotificationsPress,

    handleStorageData: useCallback(() => {
      handleGenericAlert('Depolama ve Veri');
    }, [handleGenericAlert]),

    handleHelp: useCallback(() => {
      handleGenericAlert('Yardım');
    }, [handleGenericAlert]),

    handleInviteFriends: useCallback(() => {
      handleGenericAlert('Arkadaşlarınızı davet edin');
    }, [handleGenericAlert]),
  };

  const renderSettingsSection = (section: any) => (
    <View key={section.id} style={styles.section}>
      {section.items.map((item: any, index: number) => (
        <React.Fragment key={item.id}>
          <SettingsItem
            icon={getIconComponent(item.iconType)}
            title={item.title}
            onPress={getActionHandler(item.action, actionHandlers)}
            styles={styles}
          />
          {index < section.items.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );

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
      {settingsData.map(renderSettingsSection)}
    </ScrollView>
  );
};

export default SettingsScreen;
