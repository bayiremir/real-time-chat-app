import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {deleteList, reorderLists} from '../../../redux/slices/listsSlice';
import {ListItem} from '../../../interfaces/lists.interface';
import {XMarkIcon, MinusIcon, Bars3Icon} from 'react-native-heroicons/outline';
import Sortable, {SortableGridRenderItem} from 'react-native-sortables';
import {RootStackParamList} from '../../../navigation/types';
import {styles} from './styles';

type ReorderListModalRouteProp = RouteProp<
  RootStackParamList,
  'ReorderListModal'
>;

const ReorderListModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute<ReorderListModalRouteProp>();
  const {lists} = route.params;

  const [localLists, setLocalLists] = useState<ListItem[]>(lists || []);

  const handleDeleteList = useCallback(
    (listId: string, listName: string) => {
      Alert.alert(
        'Liste Sil',
        `"${listName}" listesini silmek istediğinizden emin misiniz?`,
        [
          {
            text: 'İptal',
            style: 'cancel',
          },
          {
            text: 'Sil',
            style: 'destructive',
            onPress: () => {
              dispatch(deleteList(listId));
              setLocalLists(prev =>
                (prev || []).filter(list => list.id !== listId),
              );
            },
          },
        ],
      );
    },
    [dispatch],
  );

  const handleSaveOrder = useCallback(() => {
    if (!localLists || localLists.length === 0) return;
    const orderedIds = localLists.map(list => list.id);
    dispatch(reorderLists(orderedIds));
    navigation.goBack();
  }, [localLists, dispatch, navigation]);

  const renderItem: SortableGridRenderItem<ListItem> = useCallback(
    ({item: list}) => (
      <View key={list.id} style={styles.listItemContainer}>
        <View style={styles.listItem}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteList(list.id, list.name)}>
            <MinusIcon size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.listInfo}>
            <Text style={styles.listName}>{list.name}</Text>
            <Text style={styles.memberCount}>{list.members.length} kişi</Text>
          </View>

          <View style={styles.dragHandle}>
            <Bars3Icon size={24} color="#666" />
          </View>
        </View>
      </View>
    ),
    [handleDeleteList],
  );

  const handleClose = useCallback(() => {
    setLocalLists(lists || []);
    navigation.goBack();
  }, [lists, navigation]);

  useEffect(() => {
    setLocalLists(lists || []);
  }, [lists]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Listeleri Yeniden Sırala</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <XMarkIcon size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Herhangi bir yere basılı tutarak listeleri sürükleyebilir veya silmek
          için (-) butonuna basabilirsiniz.
        </Text>

        <View style={styles.listContainer}>
          {!localLists || localLists.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Henüz liste bulunmuyor</Text>
            </View>
          ) : (
            <Sortable.Grid
              data={localLists}
              columns={1}
              renderItem={renderItem}
              onDragEnd={({data}) => setLocalLists(data)}
              keyExtractor={list => list.id}
              rowGap={10}
              hapticsEnabled={true}
              activeItemScale={1.05}
              inactiveItemOpacity={0.8}
            />
          )}
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveOrder}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReorderListModal;
