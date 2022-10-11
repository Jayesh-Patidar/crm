import { AppState } from '@app/client/ducks/store';
import { createSlice } from '@reduxjs/toolkit';

export type Miscellaneous = {
    snackbar: Snackbar;
    searchValue: string;
};

export type Snackbar = {
    isVisible: boolean;
    message: string;
};

export type SnackbarAction = {
    payload: string | null;
};

export type SearchValueAction = {
    payload: string | null;
};

const initialState: Miscellaneous = {
    snackbar: {
        isVisible: false,
        message: '',
    },
    searchValue: '',
};

export const miscellaneousSlice = createSlice({
    name: 'miscellaneous',
    initialState,
    reducers: {
        setSnackbar(state: Miscellaneous, action: SnackbarAction) {
            state.snackbar.isVisible = !!action.payload;
            state.snackbar.message = action.payload;
        },
        setSearchValue(state: Miscellaneous, action: SearchValueAction) {
            state.searchValue = action.payload;
        },
    },
});

export const { setSnackbar, setSearchValue } = miscellaneousSlice.actions;

export const selectMiscellaneous = (state: AppState) => state.miscellaneous;

export const selectSnackbar = (state: AppState) => state.miscellaneous.snackbar;

export const selectSearchValue = (state: AppState) =>
    state.miscellaneous.searchValue;

export default miscellaneousSlice.reducer;
