import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const BulkMessageScreen = () => {
  const {user} = useSelector((state: RootState) => state.userSlice);
  return (
    <>
      <GoBackTabBar title="Toplu mesajlar" />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>
            Tek seferde çok kişiye mesaj göndermek için toplu mesaj listelerini
            kullanabilirisiniz.
          </Text>
          <Text style={styles.text}>
            Sadece telefon rehberinde {user?.phone} kayıtlı olan kişiler toplu
            mesajınızı alacak.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('button pressed');
          }}>
          <Text style={styles.buttonText}>Toplu mesajlar ekle</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BulkMessageScreen;
