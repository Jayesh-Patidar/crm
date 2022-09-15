import { ArgumentsHost, Catch, HttpStatus, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from '../interfaces';
import { ValidationFailed } from './ValidationFailed';

@Catch()
export class ExceptionHandler extends BaseExceptionFilter {
    doNotReport(): Array<any> {
        return [];
    }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.error('Error: ', exception)

        if (exception instanceof ValidationFailed) {
            return response.error(
                {
                    message: exception.message,
                    errors: exception.getErrors(),
                },
                exception.getStatus(),
            );
        }

        if (exception instanceof NotFoundException) {
            return response.status(HttpStatus.NOT_FOUND).json({
                success: false,
                code: exception.getStatus(),
                message: exception.message,
            })
        }

        let message =
            exception.message ||
            'Something went wrong. Please try again later!';

        console.log(exception);

        const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception.status ? message : 'Internal Server Error';

        return response.error(message, status);
    }
}
