import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import taskReducer from './slice/taskSlice';
import projectReducer from './slice/projectSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    taskReducer,
    projectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
