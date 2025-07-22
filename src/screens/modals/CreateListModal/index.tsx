import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {createList} from '../../../redux/slices/listsSlice';
import {User} from '../../../interfaces/api.interface';
import {XMarkIcon, PlusIcon, UserIcon} from 'react-native-heroicons/outline';
import {useGetContactsQuery} from '../../../redux/services/mobileApi';
import {styles} from './styles';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types';

type CreateListModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateListModal'
>;

const CreateListModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<CreateListModalNavigationProp>();
  const [listName, setListName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<User[]>([]);

  const {data: contactsResponse} = useGetContactsQuery({
    page: 1,
    limit: 100,
  });

  const contacts = useMemo(
    () => contactsResponse?.data || [],
    [contactsResponse?.data],
  );

  const handleCreateList = useCallback(() => {
    if (!listName.trim()) {
      Alert.alert('Hata', 'Liste adı boş olamaz');
      return;
    }

    if (selectedMembers.length === 0) {
      Alert.alert('Hata', 'En az bir kişi seçmelisiniz');
      return;
    }

    dispatch(
      createList({
        name: listName.trim(),
        members: selectedMembers,
        type: 'normal',
      }),
    );

    // Reset form
    setListName('');
    setSelectedMembers([]);
    navigation.goBack();
    Alert.alert('Başarılı', 'Liste oluşturuldu');
  }, [listName, selectedMembers, dispatch, navigation]);

  const handleClose = useCallback(() => {
    setListName('');
    setSelectedMembers([]);
    navigation.goBack();
  }, [navigation]);

  const handleRemoveMember = useCallback((memberId: string) => {
    setSelectedMembers(prev => prev.filter(member => member._id !== memberId));
  }, []);

  const handleAddMembers = useCallback(() => {
    navigation.navigate('ContactSelectionModal', {
      contacts,
      selectedMembers,
      isCreatingList: true,
    });
  }, [navigation, contacts, selectedMembers]);

  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return <Image source={{uri: user.avatar}} style={styles.memberAvatar} />;
    } else {
      return (
        <View style={styles.memberAvatarPlaceholder}>
          <UserIcon size={20} color="#666" />
        </View>
      );
    }
  };

  // Listen for contact selection results
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Get the updated selected members from navigation params if available
      const params = navigation
        .getState()
        .routes.find(route => route.name === 'CreateListModal')?.params as any;

      if (params?.selectedMembers) {
        setSelectedMembers(params.selectedMembers);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>İptal</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Yeni liste</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            handleCreateList();
          }}
          style={[
            styles.createButton,
            (!listName.trim() || selectedMembers.length === 0) &&
              styles.disabledCreateButton,
          ]}
          disabled={!listName.trim() || selectedMembers.length === 0}>
          <Text
            style={[
              styles.createText,
              (!listName.trim() || selectedMembers.length === 0) &&
                styles.disabledCreateText,
            ]}>
            Bitti
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Liste adı input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Liste adı</Text>
          <TextInput
            style={styles.input}
            value={listName}
            onChangeText={setListName}
            placeholder="Örnekler: İş, Arkadaşlar"
            placeholderTextColor="#999"
          />
        </View>

        {/* Açıklama */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Oluşturduğunuz her liste Sohbetler sekmenizin üst kısmında bir
            filtre olarak görünür.
          </Text>
        </View>

        {/* Dahil edilenler */}
        <View style={styles.membersContainer}>
          <Text style={styles.label}>Dahil edilenler</Text>

          <View style={styles.membersSection}>
            <TouchableOpacity
              style={styles.addMemberButton}
              onPress={handleAddMembers}>
              <View style={styles.addMemberIconContainer}>
                <PlusIcon size={20} color="#25D366" />
              </View>
              <Text style={styles.addMemberText}>Kişi veya grup ekleyin</Text>
            </TouchableOpacity>

            {selectedMembers.length > 0 && <View style={styles.divider} />}

            {/* Seçilen üyeleri göster */}
            {selectedMembers.map((member, index) => (
              <View key={member._id}>
                <View style={styles.memberItem}>
                  {renderAvatar(member)}
                  <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>
                      {member.firstName} {member.lastName}
                    </Text>
                    <Text style={styles.memberPhone}>{member.phone}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleRemoveMember(member._id)}
                    style={styles.removeMemberButton}>
                    <XMarkIcon size={16} color="#666" />
                  </TouchableOpacity>
                </View>
                {index < selectedMembers.length - 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateListModal;
