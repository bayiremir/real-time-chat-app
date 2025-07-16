import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {User} from '../../../interfaces/api.interface';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {styles} from './styles';
import {RootStackParamList} from '../../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  useSendMessageMutation,
  useCreateChatMutation,
  useListChatsQuery,
} from '../../../redux/services/mobileApi';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

type ForwardMessageModalRouteProp = RouteProp<
  RootStackParamList,
  'ForwardMessageModal'
>;

type ForwardMessageModalNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ForwardMessageModal'
>;

const ForwardMessageModal: React.FC = () => {
  const navigation = useNavigation<ForwardMessageModalNavigationProp>();
  const route = useRoute<ForwardMessageModalRouteProp>();
  const {message, contacts} = route.params;

  const [selectedContacts, setSelectedContacts] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [sendMessage] = useSendMessageMutation();
  const [createChat] = useCreateChatMutation();

  // Mevcut chat'leri al
  const {data: chatsData, refetch: refetchChats} = useListChatsQuery({});
  const chats = useMemo(() => chatsData?.data || [], [chatsData]);

  // Kullanıcı bilgilerini al
  const {user} = useSelector((state: RootState) => state.userSlice);

  const handleForwardMessage = useCallback(async () => {
    if (selectedContacts.length === 0) {
      Alert.alert('Hata', 'En az bir kişi seçmelisiniz');
      return;
    }

    try {
      // Her seçilen kişiye mesaj gönder
      const promises = selectedContacts.map(async contact => {
        // Önce bu kişiyle private chat'i var mı kontrol et
        const existingChat = chats.find(
          chat =>
            chat.type === 'private' &&
            chat.participants.some(
              participant =>
                participant.user && participant.user._id === contact._id,
            ),
        );

        let chatId: string;
        if (existingChat) {
          // Mevcut chat'i kullan
          chatId = existingChat._id;
        } else {
          // Yeni private chat oluştur
          const newChatResult = await createChat({
            type: 'private',
            participants: [contact._id],
          });
          const newChatId = newChatResult.data?.data._id;
          if (!newChatId) {
            throw new Error('Chat oluşturulamadı');
          }
          chatId = newChatId;
        }

        // Mesaj içeriğini hazırla
        const isOwnMessage = message.sender._id === user?._id;
        let messageContent = message.content;

        if (!isOwnMessage) {
          // Başka birinin mesajını iletiyorsa "İletilmiş mesaj" başlığı ekle
          const senderName = `${message.sender.firstName} ${message.sender.lastName}`;
          messageContent = `🔄 İletilmiş mesaj - ${senderName}:\n\n${message.content}`;
        }

        // Mesajı gönder
        return sendMessage({
          chatId: chatId,
          content: messageContent,
          type: message.type,
        });
      });

      await Promise.all(promises);

      // Chat listesini yenile
      await refetchChats();

      navigation.goBack();
      Alert.alert('Başarılı', 'Mesaj iletildi');
    } catch (error) {
      console.error('Forward message error:', error);
      Alert.alert('Hata', 'Mesaj iletilemedi');
    }
  }, [
    selectedContacts,
    message,
    sendMessage,
    navigation,
    chats,
    createChat,
    user,
    refetchChats,
  ]);

  const handleContactToggle = useCallback((contact: User) => {
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c._id === contact._id);
      if (isSelected) {
        return prev.filter(c => c._id !== contact._id);
      } else {
        return [...prev, contact];
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setSelectedContacts([]);
    setSearchQuery('');
    navigation.goBack();
  }, [navigation]);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    return contacts.filter(contact => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return fullName.includes(query);
    });
  }, [contacts, searchQuery]);

  // Group contacts by first letter
  const groupedContacts = useMemo(() => {
    const grouped: {[key: string]: User[]} = {};
    filteredContacts.forEach(contact => {
      const firstLetter = contact.firstName.charAt(0).toUpperCase();
      if (!grouped[firstLetter]) {
        grouped[firstLetter] = [];
      }
      grouped[firstLetter].push(contact);
    });
    return grouped;
  }, [filteredContacts]);

  const renderAvatar = (user: User) => {
    if (user.avatar) {
      return <Image source={{uri: user.avatar}} style={styles.avatar} />;
    } else {
      return <View style={styles.defaultAvatar} />;
    }
  };

  const renderContactItem = (contact: User) => {
    const isSelected = selectedContacts.some(c => c._id === contact._id);

    return (
      <TouchableOpacity
        key={contact._id}
        style={[styles.contactItem, isSelected && styles.selectedContactItem]}
        onPress={() => handleContactToggle(contact)}>
        <View style={styles.contactLeft}>
          <View style={styles.avatarContainer}>{renderAvatar(contact)}</View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>
              {contact.firstName} {contact.lastName}
            </Text>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
        </View>
        {isSelected && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderContactSection = (letter: string, contacts: User[]) => (
    <View key={letter} style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{letter}</Text>
      {contacts.map(contact => renderContactItem(contact))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
          <Text style={styles.cancelText}>İptal</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mesajı İlet</Text>
          <Text style={styles.headerCount}>
            {selectedContacts.length} kişi seçili
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleForwardMessage}
          style={[
            styles.forwardButton,
            selectedContacts.length === 0 && styles.disabledForwardButton,
          ]}>
          <PaperAirplaneIcon size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MagnifyingGlassIcon size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Ara"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Contact List */}
      <ScrollView style={styles.contactsList}>
        {Object.keys(groupedContacts)
          .sort()
          .map(letter => renderContactSection(letter, groupedContacts[letter]))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForwardMessageModal;
