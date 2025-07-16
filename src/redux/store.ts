import {configureStore} from '@reduxjs/toolkit';
import {mobileApi} from './services/mobileApi';
import userSlice from './slices/userSlice';
import listsSlice from './slices/listsSlice';
import starredMessagesSlice from './slices/starredMessagesSlice';

export const store = configureStore({
  reducer: {
    [mobileApi.reducerPath]: mobileApi.reducer,
    userSlice: userSlice,
    listsSlice: listsSlice,
    starredMessages: starredMessagesSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'FLUSH',
          'REHYDRATE',
          'PAUSE',
          'PERSIST',
          'PURGE',
          'REGISTER',
        ],
        warnAfter: 256,
      },
    }).concat(mobileApi.middleware),
});

// Redux store'un root state tipi
export type RootState = ReturnType<typeof store.getState>;

export default store;
