import { createAsyncThunk } from '@reduxjs/toolkit';
import IndexedDb from '../utlis/indexDb';
import { User } from '../components/user/User';
import { ROLES, STATUS } from '../components/constants';

export const fetchUser = createAsyncThunk('fetchUser', async () => {
  const userDb = new IndexedDb('user');
  await userDb.createObjectStore(['user']);
  //await userDb.putValue('user', { name: 'A Game of Thrones' });
  const users = await userDb.getAllValue('user');
  if (users.length === 0) {
    const initialUser: User = {
      firstName: 'super',
      lastName: 'user',
      role: [
        ROLES.VIEW_USERS,
        ROLES.EDIT_USERS,
        ROLES.DETELE_USERS,
        ROLES.VIEW_TASKS,
        ROLES.EDIT_TASKS,
        ROLES.DELETE_TASKS,
        ROLES.RUN_PROJECTS,
        ROLES.EDIT_PROJECTS,
        ROLES.VIEW_PROJECTS,
      ],
      status: STATUS.ACTIVE,
    };
    const userId = await userDb.putValue('user', initialUser);
    return [{ ...initialUser, id: userId }];
  }
  return users;
});

export const addUser = createAsyncThunk('addUser', async (userDetails: User) => {
  const userDb = new IndexedDb('user');
  await userDb.createObjectStore(['user']);
  const userId = await userDb.putValue('user', userDetails);
  return { ...userDetails, id: userId };
});

export const updateUser = createAsyncThunk('updateUser', async (userDetails: User) => {
  const userDb = new IndexedDb('user');
  await userDb.createObjectStore(['user']);
  await userDb.putValue('user', userDetails);
  return userDetails;
});

export const deleteUser = createAsyncThunk('deleteUser', async (userDetails: User) => {
  if (userDetails.id) {
    const userDb = new IndexedDb('user');
    await userDb.createObjectStore(['user']);
    await userDb.deleteValue('user', +userDetails.id);
    return userDetails;
  }
});
