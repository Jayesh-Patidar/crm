import { ReactNode } from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import VerticalLayout from '@app/client/@core/layouts/VerticalLayout';
import VerticalAppBarContent from '@app/client/@core/layouts/components/vertical/AppBarContent';
import VerticalNavItems from '@app/client/navigation/vertical'

interface Props {
    children: ReactNode;
}

const Admin = ({ children }: Props) => {
    /**
     *  The below variable will hide the current layout menu at given screen size.
     *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
     *  You can change the screen size from which you want to hide the current layout menu.
     *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
     *  to know more about what values can be passed to this hook.
     *  ! Do not change this value unless you know what you are doing. It can break the template.
     */
    const hidden = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('lg'),
    );

    return (
        <VerticalLayout
            hidden={hidden}
            verticalNavItems={VerticalNavItems()}
            verticalAppBarContent={(props) => (
                <VerticalAppBarContent
                    hidden={hidden}
                    toggleNavVisibility={props.toggleNavVisibility}
                />
            )}
        >
            {children}
        </VerticalLayout>
    );
};

export default Admin;
