import { api } from "../config/axios.config";
import type { TUser, UserResponse, UsersResponse } from "../types/user.types";

export const getUsers = async (page = 1, limit = 10, search?: string) => {
  const res = await api.get<UsersResponse>("/users", {
    params: { page, limit, search },
  });
  return res?.data;
};

export const createUser = async (payload: Omit<TUser, "id">) => {
  const res = await api.post<UserResponse>("/users", payload);
  return res.data;
};

export const updateUser = async (id: number, payload: Partial<TUser>) => {
  const res = await api.patch<UserResponse>(`/users/${id}`, payload);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await api.delete<UserResponse>(`/users/${id}`);
  return res.data;
};
