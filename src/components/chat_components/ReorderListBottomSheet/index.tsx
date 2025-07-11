import React, {useCallback, useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useDispatch} from 'react-redux';
import {deleteList, reorderLists} from '../../../redux/slices/listsSlice';
import {ListItem} from '../../../interfaces/lists.interface';
import {XMarkIcon, MinusIcon, Bars3Icon} from 'react-native-heroicons/outline';
import {styles} from './styles';
import Sortable, {SortableGridRenderItem} from 'react-native-sortables';

interface ReorderListBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  lists: ListItem[];
}

const ReorderListBottomSheet: React.FC<ReorderListBottomSheetProps> = ({
  isVisible,
  onClose,
  lists,
}) => {
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [localLists, setLocalLists] = useState<ListItem[]>(lists || []);

  const snapPoints = ['70%', '90%'];

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose],
  );

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
    onClose();
  }, [localLists, dispatch, onClose]);

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
    onClose();
  }, [lists, onClose]);

  useEffect(() => {
    setLocalLists(lists || []);
  }, [lists]);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      enableDynamicSizing={false}>
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Listeleri Yeniden Sırala</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <XMarkIcon size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Herhangi bir yere basılı tutarak listeleri sürükleyebilir veya
            silmek için (-) butonuna basabilirsiniz.
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
      </BottomSheetView>
    </BottomSheet>
  );
};

export default ReorderListBottomSheet;
