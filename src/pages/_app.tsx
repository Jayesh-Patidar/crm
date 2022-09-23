import Head from 'next/head';
import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { Close } from '@mui/icons-material';
import Admin from '@app/client/layouts/Admin';
import AuthGuard from '@app/client/guards/AuthGuard';
import { useSnackbar } from '@app/client/@core/hooks';
import themeConfig from '@app/client/configs/themeConfig';
import { IconButton, Slide, Snackbar } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@app/client/@core/utils';
import { PersistGate } from 'redux-persist/integration/react';
import { persistedStore, wrapper } from '@app/client/ducks/store';
import ThemeComponent from '@app/client/@core/theme/ThemeComponent';

type ExtendedAppProps = AppProps & {
    Component: NextPage;
    emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const App = (props: ExtendedAppProps) => {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    const getLayout = Component.getLayout ?? ((page) => <Admin>{page}</Admin>);

    const { snackbar, toggleSnackbar } = useSnackbar();

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        toggleSnackbar();
    };

    return (
        <PersistGate loading={null} persistor={persistedStore}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>{`${themeConfig.templateName} - Admin Panel`}</title>
                    <meta
                        name="description"
                        content={`${themeConfig.templateName}`}
                    />
                    <meta
                        name="keywords"
                        content="CRM, Computer, Repairing, Management"
                    />
                    <meta
                        name="viewport"
                        content="initial-scale=1,width=device-width"
                    />
                </Head>

                <AuthGuard>
                    <ThemeComponent>
                        {getLayout(<Component {...pageProps} />)}
                        <Snackbar
                            open={snackbar.isVisible}
                            autoHideDuration={5000}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            TransitionComponent={(props) => (
                                <Slide {...props} direction="down" />
                            )}
                            message={snackbar.message}
                            action={
                                <IconButton
                                    size="small"
                                    aria-label="close"
                                    color="inherit"
                                    onClick={handleClose}
                                >
                                    <Close fontSize="small" />
                                </IconButton>
                            }
                        />
                    </ThemeComponent>
                </AuthGuard>
            </CacheProvider>
        </PersistGate>
    );
};

export default wrapper.withRedux(App);
