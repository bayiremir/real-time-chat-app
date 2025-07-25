import React from 'react';
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
import {SettingsStackParamList} from '../../../navigation/types';
import {RootState} from '../../../redux/store';
import {
  deleteList,
  removeMembersFromList,
} from '../../../redux/slices/listsSlice';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';
import {styles} from './styles';

type ListDetailScreenRouteProp = RouteProp<
  SettingsStackParamList,
  'ListDetailScreen'
>;
type ListDetailScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  'ListDetailScreen'
>;

const ListDetailScreen = () => {
  const navigation = useNavigation<ListDetailScreenNavigationProp>();
  const route = useRoute<ListDetailScreenRouteProp>();
  const dispatch = useDispatch();

  const {list} = route.params;

  // Redux'tan güncel liste bilgilerini al
  const currentList = useSelector((state: RootState) =>
    state.listsSlice.lists.find(l => l.id === list.id),
  );

  // API'dan kontakları çek
  const {data: contactsData} = useGetContactsQuery({
    page: 1,
    limit: 100,
  });

  const handleAddMember = () => {
    navigation.getParent()?.navigate('AddMemberModal', {
      contacts: contactsData?.data || [],
      listId: displayList.id,
      existingMembers: displayList.members,
    });
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
      <GoBackTabBar
        title={displayList.name}
        children={
          <TouchableOpacity onPress={handleAddMember}>
            <Text style={styles.listItemText}>Düzenle</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.container}>
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
    </>
  );
};

export default ListDetailScreen;
