import { ReactElement, ReactNode } from 'react';
import { NextComponentType, NextPageContext } from 'next';

declare module 'next' {
    export declare type NextPage<
        P = Record<string, any>,
        IP = P,
    > = NextComponentType<NextPageContext, IP, P> & {
        getLayout?: (page: ReactElement) => ReactNode;
    };
}
