import IndexedDb from '../utlis/indexDb';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { PROJECT } from '../components/project/Project';

export const addProject = createAsyncThunk('addProject', async (projectDetails: PROJECT) => {
  const projectDb = new IndexedDb('project');
  await projectDb.createObjectStore(['project']);
  const projectId = await projectDb.putValue('project', projectDetails);
  return { ...projectDetails, id: projectId };
});
export const fetchProject = createAsyncThunk('fetchProject', async () => {
  const projectDb = new IndexedDb('project');
  await projectDb.createObjectStore(['project']);
  //await projectDb.putValue('user', { name: 'A Game of Thrones' });
  const projects = await projectDb.getAllValue('project');
  return projects;
});
export const updateProject = createAsyncThunk('updateProject', async (projectDetails: PROJECT[]) => {
  const projectDb = new IndexedDb('project');
  await projectDb.createObjectStore(['project']);
  await projectDb.putBulkValue('project', projectDetails);
  return projectDetails;
});
export const deleteProject = createAsyncThunk('deleteProject', async (projectDetails: PROJECT) => {
  if (projectDetails.id) {
    const projectDb = new IndexedDb('project');
    await projectDb.createObjectStore(['project']);
    await projectDb.deleteValue('project', +projectDetails.id);
    return projectDetails;
  }
});
