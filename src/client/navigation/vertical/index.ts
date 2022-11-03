import { VerticalNavItemsType } from '@app/client/@core/layouts';
import { HandymanOutlined } from '@mui/icons-material';

const navigation = (): VerticalNavItemsType => {
    return [
        // {
        //     title: 'Dashboard',
        //     icon: HomeOutlined,
        //     path: '/',
        // },
        {
            title: 'Repairing',
            icon: HandymanOutlined,
            path: '/repairing',
        },
    ];
};

export default navigation;
