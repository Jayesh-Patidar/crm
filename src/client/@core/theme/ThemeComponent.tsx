import {
    createTheme,
    CssBaseline,
    GlobalStyles,
    ThemeProvider,
    responsiveFontSizes,
} from '@mui/material';
import { ReactNode } from 'react';
import themeOptions from './ThemeOptions';

import overrides from './overrides';
import typography from './typography';
import themeConfig from '@app/client/configs/themeConfig';
import GlobalStyling from './globalStyles';
import { useSettings } from '../hooks';

interface Props {
    children: ReactNode;
}

const ThemeComponent = (props: Props) => {
    const { children } = props;
    const { settings } = useSettings()

    // ** Merged ThemeOptions of Core and User
    const coreThemeConfig = themeOptions(settings);

    // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
    let theme = createTheme(coreThemeConfig);

    // ** Continue theme creation and pass merged component overrides to CreateTheme function
    theme = createTheme(theme, {
        components: { ...overrides(theme) },
        typography: { ...typography(theme) },
    });

    if (themeConfig.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={() => GlobalStyling(theme) as any} />
            {children}
        </ThemeProvider>
    );
};

export default ThemeComponent;
