import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import CreateListBottomSheet from '../../../components/chat_components/CreateListBottomSheet';
import ReorderListBottomSheet from '../../../components/chat_components/ReorderListBottomSheet';
import {styles} from './styles';
import {ChevronRightIcon} from 'react-native-heroicons/outline';
import {PlusIcon} from 'react-native-heroicons/solid';
import {RootState} from '../../../redux/store';

import {RootStackParamList} from '../../../navigation/types';
import {ListItem} from '../../../interfaces/lists.interface';

type ListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListScreen'
>;

const ListScreen = () => {
  const navigation = useNavigation<ListScreenNavigationProp>();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [reorderBottomSheetVisible, setReorderBottomSheetVisible] =
    useState(false);
  const lists = useSelector((state: RootState) => state.listsSlice.lists);

  const handleCreateNewList = () => {
    setBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleReorderLists = () => {
    setReorderBottomSheetVisible(true);
  };

  const handleCloseReorderBottomSheet = () => {
    setReorderBottomSheetVisible(false);
  };

  const handleListPress = (list: ListItem) => {
    navigation.navigate('ListDetailScreen', {list});
  };

  return (
    <>
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
          <TouchableOpacity
            style={styles.listItem}
            onPress={handleCreateNewList}>
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
                  <Text style={styles.listItemText}>
                    {list.members.length} kişi
                  </Text>
                </View>
                <ChevronRightIcon size={20} color="black" />
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
        <View>
          <Text style={styles.title}>Kullanılabilir ön ayarlar</Text>
          <View style={styles.content}>
            <View style={styles.listItem}>
              <View style={styles.listItemContainer}>
                <TouchableOpacity style={styles.listItemIcon}>
                  <PlusIcon size={16} color="white" strokeWidth={2} />
                </TouchableOpacity>
                <Text style={styles.listItemText}>Liste 1</Text>
              </View>
              <ChevronRightIcon size={16} color="black" />
            </View>
            <View style={styles.divider} />
            <View style={styles.listItem}>
              <View style={styles.listItemContainer}>
                <TouchableOpacity style={styles.listItemIcon}>
                  <PlusIcon size={16} color="white" strokeWidth={2} />
                </TouchableOpacity>
                <Text style={styles.listItemText}>Liste 2</Text>
              </View>
              <ChevronRightIcon size={16} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>

      <CreateListBottomSheet
        isVisible={bottomSheetVisible}
        onClose={handleCloseBottomSheet}
      />
      <ReorderListBottomSheet
        isVisible={reorderBottomSheetVisible}
        onClose={handleCloseReorderBottomSheet}
        lists={lists}
      />
    </>
  );
};

export default ListScreen;
