import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import ProfileListItem from '../../../components/profile_components/ProfileListItem';

const ChatsScreen = () => {
  return (
    <View style={styles.container}>
      <GoBackTabBar title="Sohbetler" />
      <ScrollView>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Varsayılan sohbet teması" />
        </View>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Fotoğraflar'a kaydet" showSwitch />
        </View>
        <Text style={styles.description}>
          Gelen fotoğraf ve videoları Fotoğraflar'a otomatik olara kaydedin.
        </Text>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Sohbet yedeklemesi" showDivider />
          <ProfileListItem title="Sohbeti dışarı aktar" />
        </View>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem title="Sesli mesaj transkriptleri" />
        </View>
        <View style={[styles.content, {marginVertical: 5}]}>
          <ProfileListItem title="Sohbetleri arşivde tut" showSwitch />
        </View>
        <Text style={styles.description}>
          Arşivlenen sohbetler yeni mesaj aldığınızda arşivde kalır.
        </Text>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem
            title="Sohbetleri Android'e taşı"
            showDivider
            color="green"
            showIcon={false}
          />
          <ProfileListItem
            title="Sohbetleri iPhone'a aktarın"
            color="green"
            showIcon={false}
          />
        </View>
        <View style={[styles.content, {marginVertical: 20}]}>
          <ProfileListItem
            title="Tüm sohbetleri arşivle"
            showDivider
            color="green"
            showIcon={false}
          />
          <ProfileListItem
            title="Tüm sohbetleri temizle"
            showDivider
            color="red"
            showIcon={false}
          />
          <ProfileListItem
            title="Tüm sohbetleri sil"
            color="red"
            showIcon={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChatsScreen;
