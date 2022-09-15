import { Response as BaseResponse } from 'express';

export interface Response extends BaseResponse {
    /**
     * Return the success response from API
     *
     * @param data
     * @param status
     */
    success(
        data: Record<string, any> | Array<any> | string,
        status?: number | string,
    ): any;

    /**
     * Return the error response from API
     *
     * @param error
     * @param status
     */
    error(error: Record<string, any> | string, status?: number | string): any;

    /**
     * Return the no content response from the API
     */
    noContent(): any;

    /**
     * Return the meta data in the response.
     *
     * @param data
     * @param status
     */
    withMeta(data: Record<string, any>, status?: number | string): any;
}
