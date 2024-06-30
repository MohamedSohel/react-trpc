import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PROJECT } from '../../components/project/Project';
import { addProject, deleteProject, fetchProject, updateProject } from '../../interaction/project';

const initialState: {
  projects: Array<PROJECT>;
} = { projects: [] };

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addProject.fulfilled, (state, { payload }) => {
      state.projects = [...state.projects, payload];
    });
    builder.addCase(fetchProject.fulfilled, (state, { payload }) => {
      state.projects = [...payload];
    });
    builder.addCase(updateProject.fulfilled, (state, { payload }) => {
      state.projects = [...payload];
    });
    builder.addCase(deleteProject.fulfilled, (state, { payload }) => {
      state.projects = state.projects.filter((value) => value.id !== payload?.id);
    });
  },
});

//export const { setCurrentTask, setIsEditable } = projectSlice.actions;
export const projectSelector = (state: RootState) => state.projectReducer;
export default projectSlice.reducer;
