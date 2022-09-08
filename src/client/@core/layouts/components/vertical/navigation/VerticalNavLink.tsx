import { Settings } from '@app/client/@core/context';
import { NavLink } from '@app/client/@core/layouts/types';
import themeConfig from '@app/client/configs/themeConfig';
import {
    Box,
    BoxProps,
    Chip,
    ListItem,
    ListItemButton,
    ListItemButtonProps,
    ListItemIcon,
    styled,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { ElementType, ReactNode } from 'react';
import { handleURLQueries } from '@app/client/@core/layouts/utils';
import Link from 'next/link';
import UserIcon from '@app/client/@core/layouts/components/UserIcon';

interface Props {
    item: NavLink;
    settings: Settings;
    navVisible?: boolean;
    toggleNavVisibility: () => void;
}

const MenuNavLink = styled(ListItemButton)<
    ListItemButtonProps & {
        component?: ElementType;
        target?: '_blank' | undefined;
    }
>(({ theme }) => ({
    width: '100%',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    color: theme.palette.text.primary,
    padding: theme.spacing(2.25, 3.5),
    transition: 'opacity .25s ease-in-out',
    '&.active, &.active:hover': {
        boxShadow: theme.shadows[3],
        backgroundImage: `linear-gradient(98deg, ${theme.palette.customColors.primaryGradient}, ${theme.palette.primary.main} 94%)`,
    },
    '&.active .MuiTypography-root, &.active .MuiSvgIcon-root': {
        color: `${theme.palette.common.white} !important`,
    },
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'opacity .25s ease-in-out',
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
});

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }: Props) => {
    const router = useRouter();

    const IconTag: ReactNode = item.icon as ReactNode;

    const isNavLinkActive = () => {
        if (
            router.pathname === item.path ||
            handleURLQueries(router, item.path)
        ) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <ListItem
            disablePadding
            className="nav-link"
            disabled={item.disabled || false}
            sx={{ mt: 1.5, px: '0 !important' }}
        >
            <Link
                passHref
                href={item.path === undefined ? '/' : `${item.path}`}
            >
                <MenuNavLink
                    component={'a'}
                    className={isNavLinkActive() ? 'active' : ''}
                    {...(item.openInNewTab ? { target: '_blank' } : null)}
                    onClick={(e) => {
                        if (item.path === undefined) {
                            e.preventDefault();
                            e.stopPropagation();
                        }

                        if (navVisible) {
                            toggleNavVisibility();
                        }
                    }}
                    sx={{
                        pl: 5.5,
                        ...(item.disabled
                            ? { pointerEvents: 'none' }
                            : { cursor: 'pointer' }),
                    }}
                >
                    <ListItemIcon
                        sx={{
                            mr: 2.5,
                            color: 'text.primary',
                            transition: 'margin .25s ease-in-out',
                        }}
                    >
                        <UserIcon icon={IconTag} />
                    </ListItemIcon>

                    <MenuItemTextMetaWrapper>
                        <Typography
                            {...(themeConfig.menuTextTruncate && {
                                noWrap: true,
                            })}
                        >
                            {item.title}
                        </Typography>
                        {item.badgeContent ? (
                            <Chip
                                label={item.badgeContent}
                                color={item.badgeColor || 'primary'}
                                sx={{
                                    height: 20,
                                    fontWeight: 500,
                                    marginLeft: 1.25,
                                    '& .MuiChip-label': {
                                        px: 1.5,
                                        textTransform: 'capitalize',
                                    },
                                }}
                            />
                        ) : null}
                    </MenuItemTextMetaWrapper>
                </MenuNavLink>
            </Link>
        </ListItem>
    );
};

export default VerticalNavLink;
