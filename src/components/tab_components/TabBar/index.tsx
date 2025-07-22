import {TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  EllipsisHorizontalIcon as EllipsisHorizontalOutlineIcon,
  PlusIcon as PlusOutlineIcon,
} from 'react-native-heroicons/outline';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';

const TabBar = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const {data: contactsData} = useGetContactsQuery({page: 1, limit: 100});
  const contacts = contactsData?.data || [];

  const handleOpenAddBulkSheet = () => {
    navigation.getParent()?.navigate('AddBulkModal', {
      contacts: contacts,
    });
  };

  const handleMenuPress = useCallback(() => {
    // Bu kısım daha sonra menü açmak için kullanılabilir
    ('Menu pressed');
  }, []);

  return (
    <View style={[styles.container, {paddingTop: statusBarHeight}]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={handleMenuPress}
          activeOpacity={0.7}>
          <EllipsisHorizontalOutlineIcon
            size={16}
            color="black"
            strokeWidth={2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerRight}
          onPress={handleOpenAddBulkSheet}
          activeOpacity={0.7}>
          <PlusOutlineIcon size={16} color="white" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabBar;
