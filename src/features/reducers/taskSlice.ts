import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewTask, fetchAllUserTasks, updateTask, deleteTask } from './taskActions';
import { ITask } from '../../types';

interface TasksState {
    tasks: ITask[];
    isLoading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: null,
};

const handleAsyncAction = <T extends ITask>(builder: any, asyncAction: any) => {
    builder
        .addCase(asyncAction.pending, (state: TasksState) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(asyncAction.fulfilled, (state: TasksState, action: PayloadAction<T | T[]>) => {
            state.isLoading = false;
            if (Array.isArray(action.payload)) {
                state.tasks = action.payload;
            } else {
                state.tasks = [action.payload];
            }
        })
        .addCase(asyncAction.rejected, (state: TasksState, action: any) => {
            state.isLoading = false;
            state.error = action.error.message || '';
        });
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncAction(builder, fetchAllUserTasks);
        handleAsyncAction(builder, createNewTask);
        handleAsyncAction(builder, deleteTask);
        handleAsyncAction(builder, updateTask);
    },
});

export default tasksSlice.reducer;
