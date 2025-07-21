import {View, Text} from 'react-native';
import React from 'react';
import ProfileListItem from '../../../components/profile_components/ProfileListItem';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store';
import {
  setLastSeenSetting,
  setProfilePhotoSetting,
  setAboutSetting,
  setGroupsSetting,
  setStatusSetting,
} from '../../../redux/slices/userSlice';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProfileListPickerScreen = () => {
  const route = useRoute();
  const {title} = route.params as {title: string};
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    lastSeenSetting,
    profilePhotoSetting,
    aboutSetting,
    groupsSetting,
    statusSetting,
  } = useSelector((state: RootState) => state.userSlice);

  const options = [
    'Herkes',
    'Kişilerim',
    'Şunlar hariç kişilerim...',
    'Hiç kimse',
  ];
  const getCurrentSetting = () => {
    switch (title) {
      case 'Son görülme ve çevrimiçi':
        return lastSeenSetting;
      case 'Profil fotoğrafı':
        return profilePhotoSetting;
      case 'Hakkımda':
        return aboutSetting;
      case 'Gruplar':
        return groupsSetting;
      case 'Durum':
        return statusSetting;
      default:
        return 'Hiç kimse';
    }
  };

  const handleSelection = (selectedOption: string) => {
    switch (title) {
      case 'Son görülme ve çevrimiçi':
        dispatch(setLastSeenSetting(selectedOption));
        break;
      case 'Profil fotoğrafı':
        dispatch(setProfilePhotoSetting(selectedOption));
        break;
      case 'Hakkımda':
        dispatch(setAboutSetting(selectedOption));
        break;
      case 'Gruplar':
        dispatch(setGroupsSetting(selectedOption));
        break;
      case 'Durum':
        dispatch(setStatusSetting(selectedOption));
        break;
    }
    navigation.goBack();
  };

  const getDescription = () => {
    switch (title) {
      case 'Son görülme ve çevrimiçi':
        return 'Son görülme ve çevrimiçi bilginizi paylaşmazsanız diğer kullanıcıların son görülme ve çevrimiçi bilgisini de göremezsiniz.';
      case 'Profil fotoğrafı':
        return '';
      case 'Hakkımda':
        return '';
      case 'Gruplar':
        return 'Sizi gruplara kimlerin ekleyebileceğini seçin. Bu ayar grup davetlerini kontrol eder.';
      case 'Durum':
        return 'Durum güncellemelerinizi kimler görebileceklerini seçin. Bu ayar durum görünürlüğünüzü kontrol eder.';
      default:
        return '';
    }
  };

  const currentSetting = getCurrentSetting();

  return (
    <View style={styles.container}>
      <GoBackTabBar title={title} />
      <View style={styles.content}>
        {options.map((option, index) => (
          <ProfileListItem
            key={option}
            title={option}
            showDivider={index < options.length - 1}
            onPress={() => handleSelection(option)}
            showCheckmark={option === currentSetting}
          />
        ))}
      </View>
      <Text style={styles.description}>{getDescription()}</Text>
    </View>
  );
};

export default ProfileListPickerScreen;
