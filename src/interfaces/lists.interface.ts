import {User} from './api.interface';

export type ListType = 'normal' | 'bulk';

export interface ListItem {
  id: string;
  name: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  color?: string;
  description?: string;
  type?: ListType;
}

export interface ListsState {
  lists: ListItem[];
  isLoading: boolean;
  error: string | null;
  selectedList: ListItem | null;
}

export interface CreateListRequest {
  name: string;
  members: User[];
  description?: string;
  color?: string;
  type?: ListType;
}

export interface UpdateListRequest {
  id: string;
  name?: string;
  members?: User[];
  description?: string;
  color?: string;
  type?: ListType;
}

export interface AddMemberToListRequest {
  listId: string;
  members: User[];
}

export interface RemoveMemberFromListRequest {
  listId: string;
  memberIds: string[];
}
