import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Return } from '../interfaces';

@Injectable()
export class RequestGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        this.bindRequestHelpers(context.switchToHttp().getRequest());

        return true;
    }

    /**
     * Bind Request Helpers
     *
     * @param request
     */
    bindRequestHelpers(request: Request): Request {
        const all = function <T>(): Return<T> {
            const inputs = {
                ...request.query,
                ...request.body,
                ...request.params,
            };

            for (const key in inputs) {
                const value = inputs[key];

                if (typeof value === 'string' || value instanceof String) {
                    inputs[key] = value.trim();
                }
            }

            return inputs;
        };

        request.all = all;
        return request;
    }
}
