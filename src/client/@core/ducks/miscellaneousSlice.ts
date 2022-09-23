import { AppState } from '@app/client/ducks/store';
import { createSlice } from '@reduxjs/toolkit';

export type Miscellaneous = {
    snackbar: Snackbar;
    isLoading: boolean;
};

export type Snackbar = {
    isVisible: boolean;
    message: string;
};

export type SnackbarAction = {
    payload: string | null;
};

type IsLoadingAction = {
    payload: boolean;
};

const initialState: Miscellaneous = {
    snackbar: {
        isVisible: false,
        message: '',
    },
    isLoading: false,
};

export const miscellaneousSlice = createSlice({
    name: 'miscellaneous',
    initialState,
    reducers: {
        setSnackbar(state: Miscellaneous, action: SnackbarAction) {
            state.snackbar.isVisible = !!action.payload;
            state.snackbar.message = action.payload;
        },
        setIsLoading(state: Miscellaneous, action: IsLoadingAction) {
            state.isLoading = action.payload;
        },
    },
});

export const { setSnackbar, setIsLoading } = miscellaneousSlice.actions;

export const selectMiscellaneous = (state: AppState) => state.miscellaneous;

export const selectSnackbar = (state: AppState) => state.miscellaneous.snackbar;

export const selectIsLoading = (state: AppState) =>
    state.miscellaneous.isLoading;

export default miscellaneousSlice.reducer;
