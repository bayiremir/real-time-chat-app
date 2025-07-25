import {useState, useMemo, useEffect} from 'react';
import {useListChatsQuery} from '../redux/services/mobileApi';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ListItem} from '../interfaces/lists.interface';
import {useSocket} from './useSocket';

export const useChatScreen = () => {
  const {data, isLoading, refetch} = useListChatsQuery({});
  const lists = useSelector((state: RootState) => state.listsSlice.lists);

  // Socket integration for real-time chat list updates
  const {newMessage, messageSent, clearNewMessage, clearMessageSent} =
    useSocket();

  // State for selected list - default to "Tümü" (All)
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  // Create lists array with "Tümü" as first item
  const listsWithAll = useMemo(() => {
    const allOption: ListItem = {
      id: 'all',
      name: 'Tümü',
      members: [],
      createdAt: '',
      updatedAt: '',
    };
    return [allOption, ...lists];
  }, [lists]);

  // Filter chats based on selected list
  const filteredChats = useMemo(() => {
    if (!data?.data || selectedListId === null) {
      return data?.data || [];
    }

    const selectedList = lists.find(list => list.id === selectedListId);
    if (!selectedList) {
      return data?.data || [];
    }

    const listMemberIds = selectedList.members.map(member => member._id);

    return data.data.filter(chat =>
      chat.participants.some(
        participant =>
          participant.user && listMemberIds.includes(participant.user._id),
      ),
    );
  }, [data?.data, selectedListId, lists]);

  const handleListSelect = (listId: string) => {
    setSelectedListId(listId === 'all' ? null : listId);
  };

  const isListSelected = (listId: string) => {
    return (
      selectedListId === listId || (selectedListId === null && listId === 'all')
    );
  };

  // Listen for socket events and refetch chat list
  useEffect(() => {
    if (newMessage) {
      refetch(); // Refetch chat list when new message is received
      clearNewMessage();
    }
  }, [newMessage, refetch, clearNewMessage]);

  useEffect(() => {
    if (messageSent) {
      refetch(); // Refetch chat list when message is sent
      clearMessageSent();
    }
  }, [messageSent, refetch, clearMessageSent]);

  return {
    data,
    isLoading,
    lists,
    selectedListId,
    listsWithAll,
    filteredChats,
    handleListSelect,
    isListSelected,
  };
};
