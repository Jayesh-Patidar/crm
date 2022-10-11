import { User } from '@app/shared';
import { createSlice } from '@reduxjs/toolkit';
import { AppState } from '../store';

export type UserAction = {
    payload: User;
};

const initialState = null;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticatedUser(state: User, action: UserAction) {
            return action.payload;
        },
        logoutAuthenticatedUser() {
            return null;
        },
    },
});

export const { setAuthenticatedUser, logoutAuthenticatedUser } =
    authSlice.actions;

export const selectAuthenticatedUser = (state: AppState) => state.auth;

export default authSlice.reducer;
