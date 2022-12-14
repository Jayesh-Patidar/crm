import { ReactNode } from 'react';
import FooterContent from './FooterContent';
import { Box, useTheme } from '@mui/material';
import { useSettings } from '@app/client/@core/hooks';

interface Props {
    footerContent?: (props?: any) => ReactNode;
}

const Footer = (props: Props) => {
    const { footerContent: userFooterContent } = props;

    const theme = useTheme();

    const { settings } = useSettings();

    const { contentWidth } = settings;

    return (
        <Box
            component="footer"
            className="layout-footer"
            sx={{
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                className="footer-content-container"
                sx={{
                    width: '100%',
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    padding: theme.spacing(4, 6),
                    ...(contentWidth === 'boxed' && {
                        '@media (min-width: 1440px)': { maxWidth: 1440 },
                    }),
                }}
            >
                {userFooterContent ? (
                    userFooterContent(props)
                ) : (
                    <FooterContent />
                )}
            </Box>
        </Box>
    );
};

export default Footer;
