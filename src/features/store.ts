import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authSlice';
import taskReducer from './reducers/taskSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
