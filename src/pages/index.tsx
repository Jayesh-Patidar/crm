import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Home: FC = () => {
    const router = useRouter();
    router.push('/repairing');
    return <div></div>;
};

export default Home;
