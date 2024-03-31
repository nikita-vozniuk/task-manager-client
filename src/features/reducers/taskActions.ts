import { createAsyncThunk } from '@reduxjs/toolkit';

import { ITask } from '../../types';

import { createNewTaskAPI, getAllUserTasksAPI, updateTaskAPI, deleteTaskAPI } from '../../api/tasks';

export const createNewTask = createAsyncThunk('tasks/createNewTask', async (taskData: ITask) => {
    const response = await createNewTaskAPI(taskData);
    return response.data;
});

export const fetchAllUserTasks = createAsyncThunk('tasks/fetchAllUserTasks', async (userId: string) => {
    const response = await getAllUserTasksAPI(userId);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: string) => {
    const response = await deleteTaskAPI(taskId);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, updatedTask }: { taskId: string, updatedTask: ITask }) => {
    const response = await updateTaskAPI(taskId, updatedTask);
    return response.data;
});
