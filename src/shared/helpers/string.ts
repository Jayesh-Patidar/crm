import { User } from '../interfaces';

export const getFullName = (user: User) => {
    return (user && `${user.firstName} ${user.lastName}`) || '--';
};
