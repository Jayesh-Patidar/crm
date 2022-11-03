import { setRepairingStatus, setSearchValue } from '@app/client/@core/ducks';
import { Menu, Search } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Theme,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
} from '@mui/material';
import {
    ActionCreatorWithOptionalPayload,
    AnyAction,
    bindActionCreators,
    Dispatch,
} from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import ModeToggler from '../shared-components/footer/ModeToggler';
import UserDropdown from '../shared-components/UserDropdown';
import { REPAIRING_STATUS_REVERSE } from '@app/shared';
import { AppState } from '@app/client/ducks/store';

interface Props {
    hidden: boolean;
    search: ActionCreatorWithOptionalPayload<string, string>;
    repairingStatus: string;
    searchByRepairingStatus: ActionCreatorWithOptionalPayload<string, string>;
    toggleNavVisibility: () => void;
}

const AppBarContent = (props: Props) => {
    const {
        hidden,
        search,
        repairingStatus,
        searchByRepairingStatus,
        toggleNavVisibility,
    } = props;

    const [input, setInput] = useState<string>('');

    const hiddenSm = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm'),
    );

    const router = useRouter();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            search(input);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [input]);

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
                sx={{
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}
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
                {router.asPath === '/repairing' ? (
                    <TextField
                        size="small"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderTopLeftRadius: 24,
                                borderBottomLeftRadius: 24,
                                paddingRight: 0,
                            },
                            width: '100%',
                        }}
                        type="search"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Search by Id, Serial Number, Customer Details, Brand Details from here"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <ToggleButtonGroup
                                    color="primary"
                                    exclusive={true}
                                    value={repairingStatus}
                                    onChange={(event, value) =>
                                        searchByRepairingStatus(value)
                                    }
                                    aria-label="Repairing Status"
                                >
                                    {Object.entries(
                                        REPAIRING_STATUS_REVERSE,
                                    ).map(([status, value]) => (
                                        <ToggleButton key={status} value={status}>
                                            {value}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            ),
                        }}
                    />
                ) : null}
            </Box>
            <Box
                className="actions-right"
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                <ModeToggler />
                <UserDropdown />
            </Box>
        </Box>
    );
};

const mapStateToProps = (state: AppState) => ({
    repairingStatus: state.miscellaneous.repairingStatus,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    search: bindActionCreators(setSearchValue, dispatch),
    searchByRepairingStatus: bindActionCreators(setRepairingStatus, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBarContent);
