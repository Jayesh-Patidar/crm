import { Box, BoxProps, Fab } from '@mui/material';
import { styled } from '@mui/material';
import { LayoutProps } from '@app/client/@core/layouts/types';
import themeConfig from '@app/client/configs/themeConfig';
import { useState } from 'react';
import Navigation from './components/vertical/navigation';
import AppBar from './components/vertical/appBar';
import Footer from './components/shared-components/footer';
import ScrollToTop from './components/scroll-to-top';
import { ArrowUpward } from '@mui/icons-material';
import { useSettings } from '../hooks';
import DatePickerWrapper from '@app/client/@core/styles/libs/react-datepicker';

const VerticalLayoutWrapper = styled('div')({
    height: '100%',
    display: 'flex',
});

const MainContentWrapper = styled(Box)<BoxProps>({
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
});

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(6),
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
    },
}));

const VerticalLayout = (props: LayoutProps) => {
    const { children, scrollToTop } = props;
    const { settings } = useSettings()

    const { contentWidth } = settings;
    const navWidth = themeConfig.navigationSize;

    const [navVisible, setNavVisible] = useState<boolean>(false);

    const toggleNavVisibility = () => setNavVisible(!navVisible);

    return (
        <>
            <VerticalLayoutWrapper className="layout-wrapper">
                <Navigation
                    navWidth={navWidth}
                    navVisible={navVisible}
                    setNavVisible={setNavVisible}
                    toggleNavVisibility={toggleNavVisibility}
                    {...props}
                />
                <MainContentWrapper className="layout-content-wrapper">
                    <AppBar
                        toggleNavVisibility={toggleNavVisibility}
                        {...props}
                    />

                    <ContentWrapper
                        className="layout-page-content"
                        sx={{
                            ...(contentWidth === 'boxed' && {
                                mx: 'auto',
                                '@media (min-width: 1440px)': {
                                    maxWidth: 1440,
                                },
                                '@media (min-width:1200px)': {
                                    maxWidth: '100%',
                                },
                            }),
                        }}
                    >
                        {children}
                    </ContentWrapper>

                    <Footer {...props} />

                    <DatePickerWrapper sx={{ zIndex: 11 }}>
                        <Box id="react-datepicker-portal"></Box>
                    </DatePickerWrapper>
                </MainContentWrapper>
            </VerticalLayoutWrapper>

            {scrollToTop ? (
                scrollToTop(props)
            ) : (
                <ScrollToTop className="mui-fixed">
                    <Fab
                        color="primary"
                        size="small"
                        aria-label="scroll back to top"
                    >
                        <ArrowUpward />
                    </Fab>
                </ScrollToTop>
            )}
        </>
    );
};

export default VerticalLayout;
