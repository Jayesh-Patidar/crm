import { ReactNode } from 'react';
import {
    styled,
    SwipeableDrawer as MuiSwipeableDrawer,
    SwipeableDrawerProps,
    useTheme,
} from '@mui/material';

interface Props {
    hidden: boolean;
    navWidth: number;
    navVisible: boolean;
    children: ReactNode;
    setNavVisible: (value: boolean) => void;
}

const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
    overflow: 'hidden',
    transition: 'width .25s ease-in-out',
    '& ul': {
        listStyle: 'none',
    },
    '& .MuiListItem-gutters': {
        paddingLeft: 4,
        paddingRight: 4,
    },
    '& .MuiDrawer-paper': {
        left: 'unset',
        right: 'unset',
        overflowX: 'hidden',
        transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out',
    },
});

const Drawer = (props: Props) => {
    const { hidden, children, navVisible, navWidth, setNavVisible } = props;

    const theme = useTheme();

    // Drawer Props for Mobile & Tablet screens
    const MobileDrawerProps = {
        open: navVisible,
        onOpen: () => setNavVisible(true),
        onClose: () => setNavVisible(false),
        ModalProps: {
            keepMounted: true, // Better open performance on mobile.
        },
    };

    // Drawer Props for Desktop screens
    const DesktopDrawerProps = {
        open: true,
        onOpen: () => null,
        onClose: () => null,
    };

    return (
        <SwipeableDrawer
            className="layout-vertical-nav"
            variant={hidden ? 'temporary' : 'permanent'}
            {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
            PaperProps={{ sx: { width: navWidth } }}
            sx={{
                width: navWidth,
                '& .MuiDrawer-paper': {
                    borderRight: 0,
                    backgroundColor: theme.palette.background.default,
                },
            }}
        >
            {children}
        </SwipeableDrawer>
    );
};

export default Drawer;
