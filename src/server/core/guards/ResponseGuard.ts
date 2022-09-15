import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { get, omit } from 'lodash';
import { Observable } from 'rxjs';
import { Response } from '../interfaces';

@Injectable()
export class ResponseGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        this.bindResponseHelpers(context.switchToHttp().getResponse());

        return true;
    }

    /**
     * Bind Response Helpers
     *
     * @param response
     */
    bindResponseHelpers(response: Response): Response {
        const success = function (
            data: Record<string, any> | Array<any> | string,
            status = 200,
        ) {
            return response.status(status).json({
                success: true,
                code: status,
                data,
            });
        };

        const error = function (
            error: Record<string, any> | string,
            status = 500,
        ) {
            let message = 'Something went wrong!';
            let errors = null;

            if (error instanceof Object) {
                message = error.message;
                errors = error.errors;
            } else {
                message = error;
            }

            return response.status(status).json({
                success: true,
                code: status,
                message,
                errors,
            });
        };

        const noContent = function () {
            return response.status(204).end();
        };

        const withMeta = function (data: Record<string, any>, status = 200) {
            return response.status(status).json({
                success: true,
                code: status,
                data: get(data, 'data'),
                meta: omit(data, ['data']),
            });
        };

        response.success = success;
        response.error = error;
        response.noContent = noContent;
        response.withMeta = withMeta;

        return response;
    }
}
