import {ScrollView, View} from 'react-native';
import React from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import {ProfileListItem} from '../../../components/profile_components';

const ProfileScreen = () => {
  return (
    <ScrollView>
      <GoBackTabBar title="Hesap" />
      <View style={styles.content}>
        <ProfileListItem title="Güvenlik bildirimleri" showDivider />
        <ProfileListItem title="İki adımlı doğrulama" showDivider />
        <ProfileListItem title="E-posta adresi" showDivider />
        <ProfileListItem title="Geçiş Anahtarları" showDivider />
        <ProfileListItem title="Telefon numarasını değiştir" />
      </View>
      <View style={styles.content}>
        <ProfileListItem title="Hesap bilgilerini talep et" showDivider />
        <ProfileListItem title="Hesabımı sil" />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
