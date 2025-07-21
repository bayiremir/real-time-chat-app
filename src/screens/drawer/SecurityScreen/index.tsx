import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {ProfileListItem} from '../../../components/profile_components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const SecurityScreen = () => {
  const navigation = useNavigation();
  const {
    lastSeenSetting,
    profilePhotoSetting,
    aboutSetting,
    groupsSetting,
    statusSetting,
    connectionSetting,
    avatarSetting,
  } = useSelector((state: RootState) => state.userSlice);
  return (
    <View style={styles.container}>
      <GoBackTabBar title="Gizlilik" />
      <ScrollView>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem
            title="Son görülme ve çevrimiçi"
            showDivider
            rightText={lastSeenSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Son görülme ve çevrimiçi',
              })
            }
          />
          <ProfileListItem
            title="Profil fotoğrafı"
            showDivider
            rightText={profilePhotoSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Profil fotoğrafı',
              })
            }
          />
          <ProfileListItem
            title="Hakkımda"
            showDivider
            rightText={aboutSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Hakkımda',
              })
            }
          />
          <ProfileListItem
            title="Bağlantılar"
            showDivider
            rightText={connectionSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Bağlantılar',
              })
            }
          />
          <ProfileListItem
            title="Avatar çıkartmaları"
            showDivider
            rightText={avatarSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Avatar çıkartmaları',
              })
            }
          />
          <ProfileListItem
            title="Gruplar"
            showDivider
            rightText={groupsSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Gruplar',
              })
            }
          />
          <ProfileListItem
            title="Durum"
            rightText={statusSetting}
            onPress={() =>
              (navigation as any).navigate('ProfileListPickerScreen', {
                title: 'Durum',
              })
            }
          />
        </View>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Canlı konum" />
        </View>
        <Text style={styles.description}>
          Canlı konumuzu paylaştığınız sohbetlerin listesi.
        </Text>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Aramalar" />
        </View>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Kişiler" />
        </View>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Varsayılan mesaj süresi" />
        </View>
        <Text style={styles.description}>
          Yeni sohbetlere, ayarladığınız süre dolduğunda kaybolacak süreli
          mesajlarla başlayın.
        </Text>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Okundu bilgisi" showSwitch />
        </View>
        <Text style={styles.description}>
          Okundu bilgisini kapatırsanız diğer kişilerin okundu bilgilerini
          göremezsiniz. Grup sohbetleri için okundu bilgisi her zaman
          gönderilir.
        </Text>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Uygulama kilidi" />
        </View>
        <Text style={styles.description}>
          Whatsapp uygulamasının kilidini açmak için Face ID isteyin.
        </Text>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Sohbet kilidi" />
        </View>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Gelişmiş" />
        </View>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Gizlilik kontrolü" />
        </View>
      </ScrollView>
    </View>
  );
};

export default SecurityScreen;
