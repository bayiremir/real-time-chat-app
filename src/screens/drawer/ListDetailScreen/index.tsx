import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import GoBackTabBar from '../../../components/tab_components/GoBackTabBar';
import {PlusIcon} from 'react-native-heroicons/outline';
import {RootStackParamList} from '../../../navigation/types';
import {RootState} from '../../../redux/store';
import {
  deleteList,
  removeMembersFromList,
} from '../../../redux/slices/listsSlice';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';
import {styles} from './styles';
import AddMemberBottomSheet from '../../../components/settings_components/list/AddMemberBottomSheet';

type ListDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ListDetailScreen'
>;
type ListDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListDetailScreen'
>;

const ListDetailScreen = () => {
  const navigation = useNavigation<ListDetailScreenNavigationProp>();
  const route = useRoute<ListDetailScreenRouteProp>();
  const dispatch = useDispatch();
  const [addMemberSheetVisible, setAddMemberSheetVisible] = useState(false);

  const {list} = route.params;

  // Redux'tan güncel liste bilgilerini al
  const currentList = useSelector((state: RootState) =>
    state.listsSlice.lists.find(l => l.id === list.id),
  );

  // API'dan kontakları çek
  const {data: contactsData, isLoading: contactsLoading} = useGetContactsQuery({
    page: 1,
    limit: 100,
  });

  const handleAddMember = () => {
    setAddMemberSheetVisible(true);
  };

  const handleRemoveMember = (memberId: string, memberName: string) => {
    Alert.alert(
      'Üyeyi Çıkar',
      `${memberName} kişisini listeden çıkarmak istediğinize emin misiniz?`,
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Çıkar',
          style: 'destructive',
          onPress: () => {
            dispatch(
              removeMembersFromList({
                listId: list.id,
                memberIds: [memberId],
              }),
            );
          },
        },
      ],
    );
  };

  const handleDeleteList = () => {
    Alert.alert(
      'Listeyi Sil',
      'Bu listeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      [
        {
          text: 'İptal',
          style: 'cancel',
        },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteList(list.id));
            navigation.goBack();
          },
        },
      ],
    );
  };

  const displayList = currentList || list;

  return (
    <>
      <ScrollView style={styles.container}>
        <GoBackTabBar
          title={displayList.name}
          children={
            <TouchableOpacity onPress={handleAddMember}>
              <Text style={styles.listItemText}>Düzenle</Text>
            </TouchableOpacity>
          }
        />
        <Text style={styles.sectionTitle}>Dahil edilenler</Text>
        <View style={styles.membersSection}>
          <View style={styles.content}>
            <TouchableOpacity onPress={handleAddMember} style={styles.listItem}>
              <View style={styles.iconContainer}>
                <PlusIcon size={20} color="black" />
              </View>
              <Text style={styles.listItemText}>Kişi veya grup ekleyin</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            {displayList.members.map((member, index) => (
              <View key={member._id}>
                <TouchableOpacity
                  onPress={() =>
                    handleRemoveMember(member._id, member.lastName)
                  }
                  style={styles.listItem}>
                  <Image
                    source={{uri: member.avatar}}
                    style={styles.memberImage}
                  />
                  <Text style={styles.listItemText}>{member.lastName}</Text>
                </TouchableOpacity>
                {index < displayList.members.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.membersSection}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={handleDeleteList}
              style={styles.listItem}>
              <Text style={[styles.listItemText, {color: 'red'}]}>
                Listeyi silin
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <AddMemberBottomSheet
        isVisible={addMemberSheetVisible}
        onClose={() => setAddMemberSheetVisible(false)}
        contacts={contactsData?.data || []}
        isLoading={contactsLoading}
        listId={displayList.id}
        existingMembers={displayList.members}
      />
    </>
  );
};

export default ListDetailScreen;
