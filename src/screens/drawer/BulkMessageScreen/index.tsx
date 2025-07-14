import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {styles} from './styles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';
import AddBulkBottomSheet from '../../../components/settings_components/bulk/AddBulkBottomSheet';

const BulkMessageScreen = () => {
  const {user} = useSelector((state: RootState) => state.userSlice);
  const {lists} = useSelector((state: RootState) => state.listsSlice);
  const [isAddBulkSheetVisible, setIsAddBulkSheetVisible] = useState(false);

  const {data: contactsData, isLoading: isContactsLoading} =
    useGetContactsQuery({page: 1, limit: 100});

  const contacts = contactsData?.data || [];
  const bulkGroups = lists.filter((list: any) => list.type === 'bulk');

  const handleOpenAddBulkSheet = () => {
    setIsAddBulkSheetVisible(true);
  };

  const handleCloseAddBulkSheet = () => {
    setIsAddBulkSheetVisible(false);
  };

  return (
    <>
      <GoBackTabBar title="Toplu mesajlar" />
      <View style={styles.container}>
        {bulkGroups.length > 0 ? (
          <View style={styles.groupsContainer}>
            <Text style={styles.groupsTitle}>Toplu Mesaj Grupları</Text>
            {bulkGroups.map((group: any) => (
              <TouchableOpacity key={group.id} style={styles.groupItem}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupMembersCount}>
                    {group.members.length} kişi
                  </Text>
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

      <AddBulkBottomSheet
        isVisible={isAddBulkSheetVisible}
        onClose={handleCloseAddBulkSheet}
        contacts={contacts}
        isLoading={isContactsLoading}
      />
    </>
  );
};

export default BulkMessageScreen;
