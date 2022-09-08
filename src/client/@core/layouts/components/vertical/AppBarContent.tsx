import { Settings } from '@app/client/@core/context';
import { Menu, Search } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Theme,
    useMediaQuery,
} from '@mui/material';
import ModeToggler from '../shared-components/footer/ModeToggler';
import UserDropdown from '../shared-components/UserDropdown';

interface Props {
    hidden: boolean;
    settings: Settings;
    toggleNavVisibility: () => void;
    saveSettings: (values: Settings) => void;
}

const AppBarContent = (props: Props) => {
    const { hidden, settings, saveSettings, toggleNavVisibility } = props;

    const hiddenSm = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm'),
    );

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Box
                className="actions-left"
                sx={{ mr: 2, display: 'flex', alignItems: 'center' }}
            >
                {hidden ? (
                    <IconButton
                        color="inherit"
                        onClick={toggleNavVisibility}
                        sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
                    >
                        <Menu />
                    </IconButton>
                ) : null}
                <TextField
                    size="small"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                    placeholder="Search keyword here"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search fontSize="small" />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box
                className="actions-right"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <ModeToggler settings={settings} saveSettings={saveSettings} />
                <UserDropdown />
            </Box>
        </Box>
    );
};

export default AppBarContent;
