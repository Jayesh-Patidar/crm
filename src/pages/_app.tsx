import { FC } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createEmotionCache } from '@app/client/@core/utils';
import Admin from '@app/client/layouts/Admin';
import Head from 'next/head';
import themeConfig from '@app/client/configs/themeConfig';
import { SettingsConsumer, SettingsProvider } from '@app/client/@core/context';
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

            <SettingsProvider>
                <SettingsConsumer>
                    {({ settings }) => {
                        return (
                            <ThemeComponent settings={settings}>
                                {getLayout(<Component {...pageProps} />)}
                            </ThemeComponent>
                        );
                    }}
                </SettingsConsumer>
            </SettingsProvider>
        </CacheProvider>
    );
};

export default App;
