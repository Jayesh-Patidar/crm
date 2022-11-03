import { ReactNode } from 'react';
// import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { selectAuthenticatedUser } from '../ducks/auth';

interface Props {
    children: ReactNode;
}

const AuthGuard = (props: Props) => {
    const { children } = props;
    // const router = useRouter();
    // const authenticatedUser = useSelector(selectAuthenticatedUser);

    // useEffect(() => {
    //     const publicPaths = ['/login'];
    //     const currentPath = router.asPath.split('?')[0];
    //     if (!publicPaths.includes(currentPath) && !authenticatedUser) {
    //         router.push('/login');
    //     } else if (authenticatedUser && publicPaths.includes(currentPath)) {
    //         router.push('/')
    //     }
    // }, [authenticatedUser]);

    return <>{children}</>;
};

export default AuthGuard;
