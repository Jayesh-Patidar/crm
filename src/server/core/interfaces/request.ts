import { Request as BaseRequest } from 'express';

export type Return<T extends Record<string, any>> = {
    [k in keyof T]: any
}

export interface Request extends BaseRequest {
    /**
     * Get all inputs from the request object
     */
    all<T>(): Return<T>;

    /**
     * Get the current user from the request object
     */
    user: Record<string, any>;
}
