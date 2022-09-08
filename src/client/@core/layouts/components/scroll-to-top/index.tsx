import { styled, useScrollTrigger, Zoom } from '@mui/material';
import { ReactNode } from 'react';

interface ScrollToTopProps {
    className?: string;
    children: ReactNode;
}

const ScrollToTopStyled = styled('div')(({ theme }) => ({
    zIndex: 11,
    position: 'fixed',
    right: theme.spacing(6),
    bottom: theme.spacing(10),
}));

const ScrollToTop = (props: ScrollToTopProps) => {
    const { children, className } = props;

    const trigger = useScrollTrigger({
        threshold: 400,
        disableHysteresis: true,
    });

    const handleClick = () => {
        const anchor = document.querySelector('body');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Zoom in={trigger}>
            <ScrollToTopStyled
                className={className}
                onClick={handleClick}
                role="presentation"
            >
                {children}
            </ScrollToTopStyled>
        </Zoom>
    );
};

export default ScrollToTop;
