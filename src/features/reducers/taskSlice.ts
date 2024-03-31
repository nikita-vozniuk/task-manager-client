import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNewTaskAPI, getAllUserTasksAPI } from '../../api/tasks';

interface Task {
    title: string;
    description: string;
    dueDate: Date | string;
    completed: boolean;
    user: string;
}

interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: null,
};

export const createNewTask = createAsyncThunk('tasks/createNewTask', async (taskData: Task) => {
    const response = await createNewTaskAPI(taskData);
    return response.data;
});

export const fetchAllUserTasks = createAsyncThunk('tasks/fetchAllUserTasks', async (userId: string) => {
    const response = await getAllUserTasksAPI(userId);
    return response.data;
});

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewTask.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNewTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createNewTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            })
            .addCase(fetchAllUserTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllUserTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchAllUserTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            });
    },
});

export default tasksSlice.reducer;
