import {
    SettingsContext,
    SettingsContextValue,
} from '@app/client/@core/context';
import { useContext } from 'react';

export const useSettings = (): SettingsContextValue =>
    useContext(SettingsContext);
