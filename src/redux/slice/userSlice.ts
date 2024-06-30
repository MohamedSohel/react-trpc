import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { updateUser, fetchUser, addUser as addUserInteraction, deleteUser } from '../../interaction/user';
import { User } from '../../components/user/User';

const initialState: {
  users: Array<User>;
  editableUser: User;
  currentUser: User;
} = {
  users: [],
  editableUser: {},
  currentUser: {},
};
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setEditableUser: (state, { payload }) => {
      state.editableUser = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.users = [...payload];
      state.currentUser = payload[0];
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.users = state.users.map((value) => (value.id === payload.id ? payload : value));
    });

    builder.addCase(addUserInteraction.fulfilled, (state, { payload }) => {
      state.users = [...state.users, payload];
    });

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.users = state.users.filter((value) => value.id !== payload?.id);
    });
  },
});

export const { setEditableUser, setCurrentUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
