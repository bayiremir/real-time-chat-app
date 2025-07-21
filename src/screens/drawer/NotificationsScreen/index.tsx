import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {ProfileListItem} from '../../../components/profile_components';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <GoBackTabBar title="Bildirimler" />
      <ScrollView>
        <Text style={styles.title}>Mesaj bildirimleri</Text>
        <View style={[styles.content, {marginBottom: 20}]}>
          <ProfileListItem title="Bildirimleri göster" showSwitch showDivider />
          <ProfileListItem title="Ses" rightText="Not" showDivider />
          <ProfileListItem title="İfade bildirimleri" showSwitch />
        </View>
        <Text style={styles.title}>Grup bildirimleri</Text>
        <View style={[styles.content, {marginBottom: 20}]}>
          <ProfileListItem title="Bildirimleri göster" showSwitch showDivider />
          <ProfileListItem title="Ses" rightText="Not" showDivider />
          <ProfileListItem title="İfade bildirimleri" showSwitch />
        </View>
        <Text style={styles.title}>Durum bildirimleri</Text>
        <View style={[styles.content, {marginBottom: 20}]}>
          <ProfileListItem title="Bildirimleri göster" showSwitch showDivider />
          <ProfileListItem title="Ses" rightText="Not" showDivider />
          <ProfileListItem title="İfade bildirimleri" showSwitch />
        </View>
        <View style={[styles.content, {marginBottom: 10}]}>
          <ProfileListItem title="Hatırlatıcılar" showSwitch />
        </View>
        <Text style={styles.description}>
          Görmediğiniz mesajlar, aramalar veya durum güncellemeleriyle ilgili
          arada hatırlatıcılar alın.
        </Text>
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
