import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HttpStatus } from '@nestjs/common';
import { useSnackbar } from '@app/client/@core/hooks';
import { setIsLoading } from '@app/client/@core/ducks';
import axiosInstance, {
    AxiosRequestConfig,
    AxiosError,
    AxiosResponse,
} from 'axios';

type IUseAxiosReturn = {
    axios: <T>(options: AxiosRequestConfig) => Promise<IResponse<T>>;
};

interface IResponse<T> {
    data?: T;
    error?: Record<string, string[]>;
}

interface APIResponse<T> {
    code: number;
    success: boolean;
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
}

export const useAxios = (): IUseAxiosReturn => {
    const { toggleSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    const axios = async <T>(
        options: AxiosRequestConfig,
    ): Promise<IResponse<T>> => {
        let response: IResponse<T> = {};

        try {
            dispatch(setIsLoading(true));
            const data: AxiosResponse<APIResponse<T>> = await axiosInstance({
                ...options,
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                url: `api/${options.url.replace(/\//, '')}`,
            });

            dispatch(setIsLoading(false));
            response.data = data.data.data;
        } catch (err) {
            dispatch(setIsLoading(false));
            if (err.code === 'ERR_NETWORK') {
                toggleSnackbar('Server not available');
                return response;
            }

            const {
                response: {
                    data: { message, errors },
                    status,
                },
            } = err as AxiosError<APIResponse<T>, any>;

            toggleSnackbar(message);

            if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
                response.error = errors;
            }
        }
        return response;
    };

    return { axios };
};
