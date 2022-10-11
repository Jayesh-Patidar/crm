import { useSettings } from '@app/client/@core/hooks';
import { DarkMode, LightMode } from '@mui/icons-material';
import { IconButton, PaletteMode } from '@mui/material';

const ModeToggler = () => {
    const { settings, saveSettings } = useSettings();

    const handleModeChange = (mode: PaletteMode) => {
        saveSettings({ mode });
    };

    const handleModeToggle = () => {
        if (settings.mode === 'light') {
            handleModeChange('dark');
        } else {
            handleModeChange('light');
        }
    };

    return (
        <IconButton
            color="inherit"
            aria-haspopup="true"
            onClick={handleModeToggle}
        >
            {settings.mode === 'dark' ? <LightMode /> : <DarkMode />}
        </IconButton>
    );
};

export default ModeToggler;
