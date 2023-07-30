import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('--------Logging Begin-----------');
    console.log('Http Headers: ', context.switchToHttp().getRequest().headers);
    console.log('Method: ', context.switchToHttp().getRequest().method);
    console.log('URL: ', context.switchToHttp().getRequest().url);
    console.log(
      'Status Code: ',
      context.switchToHttp().getResponse().statusCode,
    );
    console.log('Before...');
    console.log('--------Logging END-----------');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
