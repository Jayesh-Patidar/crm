import { PaletteMode } from '@mui/material';
import themeConfig from '@app/client/configs/themeConfig';
import { createContext, ReactNode, useState } from 'react';
import { ContentWidth, ThemeColor } from '@app/client/@core/layouts';

export type Settings = {
    mode: PaletteMode;
    themeColor: ThemeColor;
    contentWidth: ContentWidth;
};

export type SettingsContextValue = {
    settings: Settings;
    saveSettings: (updatedSettings: Settings) => void;
};

const initialSettings: Settings = {
    themeColor: 'primary',
    mode: themeConfig.mode,
    contentWidth: themeConfig.contentWidth,
};

/** Create Context */
export const SettingsContext = createContext<SettingsContextValue>({
    settings: initialSettings,
    saveSettings: () => null,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    /** State */
    const [settings, setSettings] = useState<Settings>({ ...initialSettings });

    const saveSettings = (updatedSettings: Settings) => {
        setSettings(updatedSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const SettingsConsumer = SettingsContext.Consumer;
