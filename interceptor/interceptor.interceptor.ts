import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Response<T> {
    data: T;
}

@Injectable()
export class Interceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                statusCode: context.switchToHttp().getResponse().statusCode,
                date: new Date(Date.now()).toISOString(),
                //  message: data.message,
                data,
            })),
            catchError((err) => {
                const errorResponse = {
                    success: false,
                    status: err.status,
                    date: new Date(Date.now()).toISOString(),
                    message: err.message,
                    //error: err,
                }
                throw new HttpException(errorResponse, err.status)
                //....
                //  ...error,
                //   error: {
                //    message: error.message || 'An error occurred',
                //....
                //  ...error,
                //  },

            }),
        );
    }
}
