import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { TPagination } from "../../../types/generic.types";
import type { TUser, UserState } from "../../../types/user.types";

const initialState: UserState = {
  modalOpen: false,
  editingUser: null,
  searchText: "",
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    setEditingUser(state, action: PayloadAction<TUser | null>) {
      state.editingUser = action.payload;
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setPagination(state, action: PayloadAction<TPagination>) {
      state.pagination = action.payload;
    },
  },
});

export const { setModalOpen, setEditingUser, setSearchText, setPagination } =
  usersSlice.actions;

export default usersSlice.reducer;
