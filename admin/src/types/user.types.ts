import type { TPagination } from "./generic.types";

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  createdAt: string;
};

export interface UserState {
  modalOpen: boolean;
  editingUser: TUser | null;
  searchText: string;
  pagination: TPagination;
}

export type UsersResponse = {
  data: TUser[];
  total: number;
  page: number;
  lastPage: number;
};

export type UserResponse = {
  message?: string;
  data: TUser;
};
