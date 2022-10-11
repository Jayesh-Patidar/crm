import { Box, Link, Typography } from '@mui/material';

const FooterContent = () => {
    return (
        <Box
            sx={{
                position:'fixed',
                right: 25,
                bottom: 20,
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
                <Link target='_blank' href='https://github.com/Jayesh-Patidar' sx={{ color: 'primary' }}>
                    Jayesh Patidar
                </Link>
            </Typography>
        </Box>
    );
};

export default FooterContent;
