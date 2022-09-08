import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';

const FooterContent = () => {
    const hidden = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('md'),
    );

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >
            <Typography sx={{ mr: 2 }}>
                {`© ${new Date().getFullYear()}, Made with `}
                <Box component="span" sx={{ color: 'error.main' }}>
                    ❤️
                </Box>
                {` by `}
                <Link target="_blank" href="https://github.com/Jayesh-Patidar">
                    Jayesh Patidar
                </Link>
            </Typography>
        </Box>
    );
};

export default FooterContent;
