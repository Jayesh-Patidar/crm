import { combineReducers } from '@reduxjs/toolkit';
import { settingsSlice } from '../@core/settings';

export const rootReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
});
