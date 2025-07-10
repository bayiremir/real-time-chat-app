import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {storage} from '../../utils/Storage';
import {userSliceInitialStateType} from '../../interfaces/userslice.interface';
import {User} from '../../interfaces/api.interface';

const storedUser = storage.getString('user');
const storedToken = storage.getString('token');

const initialState: userSliceInitialStateType = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  language: storage.getString('language') || 'tr',
  authLogin: storage.getString('authLogin') === 'true' || false,
  theme: storage.getString('theme') || 'light',
  onboarding: storage.getString('onboarding') === 'true' || false,
  notificationEnabled:
    storage.getString('notificationEnabled') === 'true' || false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthLogin: (state, action: PayloadAction<boolean>) => {
      state.authLogin = action.payload;
      storage.set('authLogin', action.payload.toString());
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      storage.set('user', JSON.stringify(action.payload));
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      storage.set('token', action.payload);
    },

    loginSuccess: (
      state,
      action: PayloadAction<{user: User; token: string}>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authLogin = true;
      state.isLoading = false;
      state.error = null;

      // Store in async storage
      storage.set('user', JSON.stringify(action.payload.user));
      storage.set('token', action.payload.token);
      storage.set('authLogin', 'true');
    },

    logout: state => {
      state.user = null;
      state.token = null;
      state.authLogin = false;
      state.isLoading = false;
      state.error = null;

      // Clear async storage
      storage.delete('user');
      storage.delete('token');
      storage.set('authLogin', 'false');
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
        storage.set('user', JSON.stringify(state.user));
      }
    },

    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      storage.set('language', action.payload);
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      storage.set('theme', action.payload);
    },

    setOnboarding: (state, action: PayloadAction<boolean>) => {
      state.onboarding = action.payload;
      storage.set('onboarding', action.payload.toString());
    },

    setNotificationEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationEnabled = action.payload;
      storage.set('notificationEnabled', action.payload.toString());
    },
  },
});

export const {
  setAuthLogin,
  setUser,
  setToken,
  loginSuccess,
  logout,
  setLoading,
  setError,
  updateUserProfile,
  setLanguage,
  setTheme,
  setOnboarding,
  setNotificationEnabled,
} = userSlice.actions;

export default userSlice.reducer;
