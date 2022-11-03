import { getFullName, User } from '@app/shared';
import { AppState } from '@app/client/ducks/store';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    Menu,
    styled,
    Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Fragment, SyntheticEvent, useState } from 'react';
import { logoutAuthenticatedUser } from '@app/client/ducks/auth';
import { ActionCreatorWithPayload, bindActionCreators } from '@reduxjs/toolkit';

interface Props {
    auth: User;
    logout: ActionCreatorWithPayload<null, string>;
}

const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = (props: Props) => {
    // const { logout } = props;
    const auth: User = {
        id: 1,
        firstName: 'Narendra',
        lastName: 'Patidar',
        phone: '9977952494',
        role: 1,
        accessToken: '',
    };

    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    const router = useRouter();

    const handleDropdownOpen = (event: SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = (url?: string) => {
        if (url) {
            router.push(url);
        }

        setAnchorEl(null);
    };

    // const handleLogout = () => {
    //     handleDropdownClose();
    //     logout(null);
    // };

    // const styles = {
    //     py: 2,
    //     px: 4,
    //     width: '100%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     color: 'text.primary',
    //     textDecoration: 'none',
    //     '& svg': {
    //         fontSize: '1.375rem',
    //         color: 'text.secondary',
    //     },
    // };

    return (
        <Fragment>
            <Badge
                overlap="circular"
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Avatar
                    alt={getFullName(auth)}
                    onClick={handleDropdownOpen}
                    sx={{ width: 40, height: 40 }}
                    src={`https://ui-avatars.com/api/?name=${getFullName(
                        auth,
                    )}`}
                />
            </Badge>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge
                            overlap="circular"
                            badgeContent={<BadgeContentSpan />}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Avatar
                                alt={getFullName(auth)}
                                src={`https://ui-avatars.com/api/?name=${getFullName(
                                    auth,
                                )}`}
                                sx={{ width: '2.5rem', height: '2.5rem' }}
                            />
                        </Badge>
                        <Box
                            sx={{
                                display: 'flex',
                                marginLeft: 3,
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>
                                {getFullName(auth)}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: '0.8rem',
                                    color: 'text.disabled',
                                }}
                            >
                                Admin
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ mt: 0, mb: 1 }} />
                {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <PersonOutline sx={{ marginRight: 2 }} />
                        Profile
                    </Box>
                </MenuItem> */}
                {/* <Divider />
                <MenuItem sx={{ py: 2 }} onClick={handleLogout}>
                    <Logout
                        sx={{
                            marginRight: 2,
                            fontSize: '1.375rem',
                            color: 'text.secondary',
                        }}
                    />
                    Logout
                </MenuItem> */}
            </Menu>
        </Fragment>
    );
};

const mapStateToProps = (state: AppState) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
    logout: bindActionCreators(logoutAuthenticatedUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
