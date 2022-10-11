import { setSearchValue } from '@app/client/@core/ducks';
import { Menu, Search } from '@mui/icons-material';
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Theme,
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

interface Props {
    hidden: boolean;
    search: ActionCreatorWithOptionalPayload<string, string>;
    toggleNavVisibility: () => void;
}

const AppBarContent = (props: Props) => {
    const { hidden, search, toggleNavVisibility } = props;

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
                    width: '60%',
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
                            '& .MuiOutlinedInput-root': { borderRadius: 4 },
                            width: '60%',
                        }}
                        type="search"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        placeholder="Search by Id, Customer Details, Brand Details from here"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" />
                                </InputAdornment>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    search: bindActionCreators(setSearchValue, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBarContent);
