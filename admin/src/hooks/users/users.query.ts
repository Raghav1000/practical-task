import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as API from "../../api/users.api";
import type { TUser, UserResponse } from "../../types/user.types";
import type { ApiError } from "../../types/generic.types";

export const USERS_KEY = ["users"];

export const useUsersQuery = (page: number, limit: number, search?: string) => {
  return useQuery({
    queryKey: [...USERS_KEY, page, limit, search],
    queryFn: () => API.getUsers(page, limit, search),
    staleTime: 1000 * 60,
  });
};

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation<UserResponse, ApiError, Omit<TUser, "id">>({
    mutationFn: (payload) => API.createUser(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation<
    UserResponse,
    ApiError,
    { id: number; data: Omit<Partial<TUser>, "id" | "email"> }
  >({
    mutationFn: ({ id, data }) => API.updateUser(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["users"] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => API.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
};
