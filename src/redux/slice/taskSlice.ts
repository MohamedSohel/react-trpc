import { createSlice } from '@reduxjs/toolkit';
import { TASK } from '../../components/task/Task';
import { RootState } from '../store';
import { addTask, deleteTask, fetchTask, updateTask } from '../../interaction/task';

const initialState: {
  tasks: Array<TASK>;
  currenTask: TASK;
  isEditable: boolean;
} = { tasks: [], currenTask: {}, isEditable: true };

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, { payload }) => {
      state.currenTask = payload;
    },
    setIsEditable: (state, { payload }) => {
      state.isEditable = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (state, { payload }) => {
      state.tasks = [...state.tasks, payload];
    });
    builder.addCase(fetchTask.fulfilled, (state, { payload }) => {
      state.tasks = [...payload];
    });
    builder.addCase(updateTask.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.map((value) => (value.id === payload.id ? payload : value));
    });
    builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
      state.tasks = state.tasks.filter((value) => value.id !== payload?.id);
    });
  },
});
export const { setCurrentTask, setIsEditable } = taskSlice.actions;
export const taskSelector = (state: RootState) => state.taskReducer;
export default taskSlice.reducer;
