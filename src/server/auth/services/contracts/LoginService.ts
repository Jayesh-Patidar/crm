import { ILoginRequest } from '../../interfaces';

export interface LoginServiceContract {
    login(inputs: ILoginRequest);
}
