import moment from 'moment';
import { PaletteMode } from '@mui/material';

export const getThemeMode = (): PaletteMode =>
    moment().isBetween(
        moment('06:00:00', 'HH:mm:ss'),
        moment('18:00:00', 'HH:mm:ss'),
    )
        ? 'light'
        : 'dark';
