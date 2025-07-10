import {User} from './api.interface';

export interface userSliceType extends User {
  // Extended properties if needed
}

export type userSliceInitialStateType = {
  authLogin: boolean;
  user: userSliceType | null;
  token: string | null;
  theme: string;
  onboarding: boolean;
  notificationEnabled: boolean;
  language: string;
  isLoading: boolean;
  error: string | null;
};
