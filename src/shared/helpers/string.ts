import { Customer, User } from '../interfaces';

export const getFullName = (user: User | Customer) => {
    return (user && `${user.firstName} ${user.lastName || ''}`) || '--';
};
