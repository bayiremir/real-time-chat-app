import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

import {RootState} from '../../../redux/store';

import {RootStackParamList} from '../../../navigation/types';
import {ListItem} from '../../../interfaces/lists.interface';

type ListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListScreen'
>;

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const allLists = useSelector((state: RootState) => state.listsSlice.lists);

  // Sadece normal listeleri göster, bulk mesaj gruplarını hariç tut
  const lists = allLists.filter(
    (list: any) => !list.type || list.type === 'normal',
  );

  const handleCreateNewList = () => {
    navigation.navigate('CreateListModal');
  };

  const handleReorderLists = () => {
    navigation.navigate('ReorderListModal', {lists});
  };

  const handleListPress = (list: ListItem) => {
    navigation.navigate('ListDetailScreen', {list});
  };

  return (
    <ScrollView style={styles.container}>
      <GoBackTabBar
        title="Listeler"
        children={
          <TouchableOpacity onPress={handleReorderLists}>
            <Text style={styles.listItemText}>Yeniden sırala</Text>
          </TouchableOpacity>
        }
      />
      <Text style={styles.title}>Listeleriniz</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.listItem} onPress={handleCreateNewList}>
          <Text style={[styles.listItemText, {color: 'green'}]}>
            Yeni liste
          </Text>
        </TouchableOpacity>
        <View style={styles.divider} />

        {lists.map((list, index) => (
          <React.Fragment key={list.id}>
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleListPress(list)}>
              <View style={styles.listItemContainer}>
                <Text style={styles.listItemText}>{list.name}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.listItemText}>
                  {list.members.length} kişi
                </Text>
                <ChevronRightIcon size={20} color="black" />
              </View>
            </TouchableOpacity>
            {index < lists.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Listelerinizi düzenleyebilir ve listelerinizin Sohbetler sekmesinde
          gösterilme sırasını değiştirebilirisiniz.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ListScreen;
