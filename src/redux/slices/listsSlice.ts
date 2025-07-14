import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {storage} from '../../utils/Storage';
import {
  ListsState,
  ListItem,
  CreateListRequest,
  UpdateListRequest,
  AddMemberToListRequest,
  RemoveMemberFromListRequest,
} from '../../interfaces/lists.interface';

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const storedLists = storage.getString('lists');

const initialState: ListsState = {
  lists: storedLists ? JSON.parse(storedLists) : [],
  isLoading: false,
  error: null,
  selectedList: null,
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    setSelectedList: (state, action: PayloadAction<ListItem | null>) => {
      state.selectedList = action.payload;
    },

    createList: (state, action: PayloadAction<CreateListRequest>) => {
      const newList: ListItem = {
        id: generateId(),
        name: action.payload.name,
        members: action.payload.members,
        description: action.payload.description,
        color: action.payload.color,
        type: action.payload.type || 'normal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.lists.push(newList);
      storage.set('lists', JSON.stringify(state.lists));
    },

    updateList: (state, action: PayloadAction<UpdateListRequest>) => {
      const index = state.lists.findIndex(
        list => list.id === action.payload.id,
      );
      if (index !== -1) {
        state.lists[index] = {
          ...state.lists[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
        storage.set('lists', JSON.stringify(state.lists));
      }
    },

    deleteList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      storage.set('lists', JSON.stringify(state.lists));
    },

    addMembersToList: (
      state,
      action: PayloadAction<AddMemberToListRequest>,
    ) => {
      const index = state.lists.findIndex(
        list => list.id === action.payload.listId,
      );
      if (index !== -1) {
        const existingMemberIds = state.lists[index].members.map(
          member => member._id,
        );
        const newMembers = action.payload.members.filter(
          member => !existingMemberIds.includes(member._id),
        );

        state.lists[index].members = [
          ...state.lists[index].members,
          ...newMembers,
        ];
        state.lists[index].updatedAt = new Date().toISOString();
        storage.set('lists', JSON.stringify(state.lists));
      }
    },

    removeMembersFromList: (
      state,
      action: PayloadAction<RemoveMemberFromListRequest>,
    ) => {
      const index = state.lists.findIndex(
        list => list.id === action.payload.listId,
      );
      if (index !== -1) {
        state.lists[index].members = state.lists[index].members.filter(
          member => !action.payload.memberIds.includes(member._id),
        );
        state.lists[index].updatedAt = new Date().toISOString();
        storage.set('lists', JSON.stringify(state.lists));
      }
    },

    clearLists: state => {
      state.lists = [];
      state.selectedList = null;
      storage.delete('lists');
    },

    reorderLists: (state, action: PayloadAction<string[]>) => {
      const orderedIds = action.payload;
      const reorderedLists = orderedIds
        .map(id => state.lists.find(list => list.id === id))
        .filter(Boolean) as ListItem[];

      state.lists = reorderedLists;
      storage.set('lists', JSON.stringify(state.lists));
    },
  },
});

export const {
  setLoading,
  setError,
  setSelectedList,
  createList,
  updateList,
  deleteList,
  addMembersToList,
  removeMembersFromList,
  clearLists,
  reorderLists,
} = listsSlice.actions;

export default listsSlice.reducer;
