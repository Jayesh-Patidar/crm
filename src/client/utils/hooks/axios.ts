import { useEffect, useState } from 'react';
import { HttpStatus } from '@nestjs/common';
import { useSettings } from '@app/client/@core/hooks';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type IUseAxiosReturn = [
    IResponse,
    (options: AxiosRequestConfig) => Promise<void>,
];

interface IResponse {
    data: Record<string, any> | null;
    error: Record<string, any> | null;
    isLoading: boolean;
}

export const useAxios = (options?: AxiosRequestConfig): IUseAxiosReturn => {
    let response: IResponse = {
        data: null,
        error: null,
        isLoading: true,
    };
    const { settings, saveSettings } = useSettings();

    const fetcher = async (options: AxiosRequestConfig): Promise<void> => {
        try {
            const data = await axios({
                ...options,
                baseURL: process.env.NEXT_PUBLIC_API_URL,
                url: `api/${options.url.replace(/\//, '')}`,
            });

            response = {
                data: data.data.data,
                error: null,
                isLoading: false
            }
        } catch (err) {
            const {
                response: {
                    data: { message, errors },
                    status,
                },
            } = err as AxiosError<any, any>;

            saveSettings({ ...settings, snackbar: { isVisible: true, message }})

            if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
                response.error = errors;
            }
        }
    };

    useEffect(() => {
        if (options) {
            fetcher(options);
        }
    }, []);

    return [response, fetcher];
};
