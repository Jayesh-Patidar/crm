import themeConfig from '@app/client/configs/themeConfig';
import { AppState } from '@app/client/ducks/store';
import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';
import { ContentWidth, ThemeColor } from '../layouts';

export type Settings = {
    mode: PaletteMode;
    themeColor: ThemeColor;
    contentWidth: ContentWidth;
};

const initialSettings: Settings = {
    themeColor: 'primary',
    mode: themeConfig.mode,
    contentWidth: themeConfig.contentWidth,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettings,
    reducers: {
        setSettings(state, action) {
            console.log(state, action);
        },
    },
});

export const { setSettings } = settingsSlice.actions;

export const selectSettings = (state: AppState) => state.settings;

export default settingsSlice.reducer;
