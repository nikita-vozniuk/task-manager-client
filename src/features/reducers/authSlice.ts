import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAuthAPI, loginAPI, registerAPI, logoutAPI } from '../../api/auth';

interface User {
    _id: string;
    username: string;
    email: string;
    authentication: {
        sessionToken: string;
    };
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

export const isAuth = createAsyncThunk('auth', async (credentials: { sessionToken: string }) => {
    const response = await isAuthAPI(credentials);
    return response.data;
});

export const login = createAsyncThunk('auth/login', async (credentials: { email: string; password: string }) => {
    const response = await loginAPI(credentials);
    return response.data;
});

export const register = createAsyncThunk(
    'auth/register',
    async (userData: { username: string; email: string; password: string }) => {
        const response = await registerAPI(userData);
        return response.data;
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await logoutAPI();
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                localStorage.setItem('auth-session-token', action.payload.authentication.sessionToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
                localStorage.removeItem('auth-session-token');
            })
            .addCase(isAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(isAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(isAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
                localStorage.removeItem('auth-session-token');
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                localStorage.removeItem('auth-session-token');
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            });
    },
});

export default authSlice.reducer;
