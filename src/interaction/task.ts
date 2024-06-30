import { createAsyncThunk } from '@reduxjs/toolkit';
import IndexedDb from '../utlis/indexDb';
import { TASK } from '../components/task/Task';

export const addTask = createAsyncThunk('addTask', async (taskDetails: TASK) => {
  const taskDb = new IndexedDb('task');
  await taskDb.createObjectStore(['task']);
  const taskId = await taskDb.putValue('task', taskDetails);
  return { ...taskDetails, id: taskId };
});
export const fetchTask = createAsyncThunk('fetchTask', async () => {
  const taskDb = new IndexedDb('task');
  await taskDb.createObjectStore(['task']);
  //await taskDb.putValue('user', { name: 'A Game of Thrones' });
  const tasks = await taskDb.getAllValue('task');
  return tasks;
});
export const updateTask = createAsyncThunk('updateTask', async (taskDetails: TASK) => {
  const taskDb = new IndexedDb('task');
  await taskDb.createObjectStore(['task']);
  await taskDb.putValue('task', taskDetails);
  return taskDetails;
});
export const deleteTask = createAsyncThunk('deleteTask', async (taskDetails: Task) => {
  if (taskDetails.id) {
    const taskDb = new IndexedDb('task');
    await taskDb.createObjectStore(['task']);
    await taskDb.deleteValue('task', +taskDetails.id);
    return taskDetails;
  }
});
