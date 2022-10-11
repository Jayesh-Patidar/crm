import { ReactNode } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type ContentWidth = 'full' | 'boxed';

export type ThemeColor =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';

export type NavLink = {
    path?: string;
    title: string;
    action?: string;
    subject?: string;
    disabled?: boolean;
    badgeContent?: string;
    externalLink?: boolean;
    openInNewTab?: boolean;
    icon?:
        | string
        | string[]
        | ReactNode
        | OverridableComponent<SvgIconTypeMap<Record<string, any>, 'svg'>>;
    badgeColor?:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'warning'
        | 'info';
};

export type NavSectionTitle = {
    sectionTitle: string;
    action?: string;
    subject?: string;
};

export type VerticalNavItemsType = (NavLink | NavSectionTitle)[];

export type LayoutProps = {
    hidden: boolean;
    children: ReactNode;
    verticalNavItems?: VerticalNavItemsType;
    scrollToTop?: (props?: any) => ReactNode;
    footerContent?: (props?: any) => ReactNode;
    verticalAppBarContent?: (props?: any) => ReactNode;
    verticalNavMenuContent?: (props?: any) => ReactNode;
    verticalNavMenuBranding?: (props?: any) => ReactNode;
    afterVerticalNavMenuContent?: (props?: any) => ReactNode;
    beforeVerticalNavMenuContent?: (props?: any) => ReactNode;
};

export type BlankLayoutProps = {
    children: ReactNode;
};
