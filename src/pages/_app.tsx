import { SyntheticEvent, Fragment } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import type { NextPage } from 'next';
import Admin from '@app/client/layouts/Admin';
import { Button, IconButton, Slide, Snackbar } from '@mui/material';
import themeConfig from '@app/client/configs/themeConfig';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@app/client/@core/utils';
import {
    Settings,
    SettingsConsumer,
    SettingsProvider,
} from '@app/client/@core/context';
import ThemeComponent from '@app/client/@core/theme/ThemeComponent';
import { Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectSettings, setSettings } from '@app/client/@core/settings';
import { wrapper } from '@app/client/ducks/store';

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

    const settings = useSelector(selectSettings)
    console.log("🚀 ~ file: _app.tsx ~ line 38 ~ App ~ settings", settings)
    const dispatch = useDispatch()
    dispatch(setSettings({ ...settings, mode: 'dark' }))
    console.log("🚀 ~ file: _app.tsx ~ line 38 ~ App ~ settings", settings)

    const handleClose = (
        event: SyntheticEvent | Event,
        settings: Settings,
        saveSettings: (updatedSettings: Settings) => void,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        saveSettings({ ...settings, snackbar: { isVisible: false } });
    };

    return (
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

            <ThemeComponent settings={settings}>
                {getLayout(<Component {...pageProps} />)}
                {/* <Snackbar
                    open={settings.snackbar.isVisible}
                    autoHideDuration={5000}
                    onClose={(event, reason) =>
                        handleClose(event, settings, saveSettings, reason)
                    }
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    TransitionComponent={(props) => (
                        <Slide {...props} direction="down" />
                    )}
                    message={settings.snackbar.message}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={(event) =>
                                handleClose(event, settings, saveSettings)
                            }
                        >
                            <Close fontSize="small" />
                        </IconButton>
                    }
                /> */}
            </ThemeComponent>
        </CacheProvider>
    );
};

export default wrapper.withRedux(App);
