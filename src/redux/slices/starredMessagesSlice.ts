import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {storage} from '../../utils/Storage';
import {Message} from '../../interfaces/api.interface';

interface StarredMessagesState {
  starredMessages: Message[];
  isLoading: boolean;
  error: string | null;
}

const storedStarredMessages = storage.getString('starredMessages');

const initialState: StarredMessagesState = {
  starredMessages: storedStarredMessages
    ? JSON.parse(storedStarredMessages)
    : [],
  isLoading: false,
  error: null,
};

const starredMessagesSlice = createSlice({
  name: 'starredMessages',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    addToStarred: (state, action: PayloadAction<Message>) => {
      const messageId = action.payload._id;
      const exists = state.starredMessages.find(msg => msg._id === messageId);

      if (!exists) {
        state.starredMessages.push(action.payload);
        storage.set('starredMessages', JSON.stringify(state.starredMessages));
      }
    },

    removeFromStarred: (state, action: PayloadAction<string>) => {
      const messageId = action.payload;
      state.starredMessages = state.starredMessages.filter(
        msg => msg._id !== messageId,
      );
      storage.set('starredMessages', JSON.stringify(state.starredMessages));
    },

    clearStarredMessages: state => {
      state.starredMessages = [];
      storage.delete('starredMessages');
    },
  },
});

export const {
  setLoading,
  setError,
  addToStarred,
  removeFromStarred,
  clearStarredMessages,
} = starredMessagesSlice.actions;

// Selector function to check if a message is starred
export const isMessageStarred = (
  state: {starredMessages: StarredMessagesState},
  messageId: string,
) => {
  return state.starredMessages.starredMessages.some(
    msg => msg._id === messageId,
  );
};

export default starredMessagesSlice.reducer;
