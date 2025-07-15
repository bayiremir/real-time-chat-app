import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../../redux/store';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types';
import {deleteList} from '../../../redux/slices/listsSlice';

type BulkMessageScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BulkMessageScreen'
>;

const BulkMessageScreen = () => {
  const navigation = useNavigation<BulkMessageScreenNavigationProp>();
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const {user} = useSelector((state: RootState) => state.userSlice);
  const {lists} = useSelector((state: RootState) => state.listsSlice);

  const {data: contactsData} = useGetContactsQuery({page: 1, limit: 100});

  const contacts = contactsData?.data || [];
  const bulkGroups = lists.filter((list: any) => list.type === 'bulk');

  const handleOpenAddBulkSheet = () => {
    navigation.navigate('AddBulkModal', {
      contacts: contacts,
    });
  };

  const handleEdit = () => {
    setIsEditMode(!isEditMode);
    setSelectedItems([]);
  };

  const handleItemSelect = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDelete = () => {
    selectedItems.forEach(itemId => {
      dispatch(deleteList(itemId));
    });
    setSelectedItems([]);
    setIsEditMode(false);
  };

  const renderHeaderActions = () => {
    if (isEditMode) {
      return (
        <View style={styles.headerActions}>
          {selectedItems.length > 0 && (
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}>
              <Text style={styles.editButtonText}>Sil</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButtonText}>İptal</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity onPress={handleEdit}>
        <Text style={styles.editButtonText}>Düzenle</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <GoBackTabBar title="Toplu mesajlar" children={renderHeaderActions()} />
      <View style={styles.container}>
        {bulkGroups.length > 0 ? (
          <View style={styles.groupsContainer}>
            <Text style={styles.groupsTitle}>Toplu Mesaj Grupları</Text>
            {bulkGroups.map((group: any) => (
              <TouchableOpacity
                key={group.id}
                style={[
                  styles.groupItem,
                  isEditMode &&
                    selectedItems.includes(group.id) &&
                    styles.selectedGroupItem,
                ]}
                onPress={() => isEditMode && handleItemSelect(group.id)}>
                {isEditMode && (
                  <View
                    style={[
                      styles.selectionCircle,
                      selectedItems.includes(group.id) && styles.selectedCircle,
                    ]}>
                    {selectedItems.includes(group.id) && (
                      <View style={styles.selectedIndicator} />
                    )}
                  </View>
                )}
                <View style={styles.groupContent}>
                  <View style={styles.groupInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.groupMembersCount}>
                      {group.members.length} kişi
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.text}>
              Tek seferde çok kişiye mesaj göndermek için toplu mesaj
              listelerini kullanabilirisiniz.
            </Text>
            <Text style={styles.text}>
              Sadece telefon rehberinde {user?.phone} kayıtlı olan kişiler toplu
              mesajınızı alacak.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleOpenAddBulkSheet}>
          <Text style={styles.buttonText}>Toplu mesaj grubu ekle</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BulkMessageScreen;
