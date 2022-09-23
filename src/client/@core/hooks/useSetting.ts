import { useDispatch, useSelector } from 'react-redux';
import {
    selectSettings,
    setSettings,
    Settings,
    SettingsAction,
} from '../ducks';

export type UseSettingsReturn = {
    settings: Settings;
    saveSettings: (settings: SettingsAction['payload']) => void;
};

export const useSettings = (): UseSettingsReturn => {
    const dispatch = useDispatch();
    const settings = useSelector(selectSettings);

    const saveSettings = (settings: SettingsAction['payload']) => {
        dispatch(setSettings(settings));
    };

    return { settings, saveSettings };
};
