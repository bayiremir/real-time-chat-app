import {User} from './api.interface';

export interface ListItem {
  id: string;
  name: string;
  members: User[];
  createdAt: string;
  updatedAt: string;
  color?: string;
  description?: string;
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
}

export interface UpdateListRequest {
  id: string;
  name?: string;
  members?: User[];
  description?: string;
  color?: string;
}

export interface AddMemberToListRequest {
  listId: string;
  members: User[];
}

export interface RemoveMemberFromListRequest {
  listId: string;
  memberIds: string[];
}
