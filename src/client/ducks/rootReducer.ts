import { combineReducers } from '@reduxjs/toolkit';
import { miscellaneousSlice, settingsSlice } from '../@core/ducks';
import { authSlice } from './auth';

export const rootReducer = combineReducers({
    [settingsSlice.name]: settingsSlice.reducer,
    [miscellaneousSlice.name]: miscellaneousSlice.reducer,
    [authSlice.name]: authSlice.reducer,
});
