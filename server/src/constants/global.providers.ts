import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ValidationPipe } from 'src/pipes/validation.pipe';

export const globalProviders = [
  // { provide: APP_PIPE, useClass: ValidationPipe },
  // {
  //   provide: APP_INTERCEPTOR,
  //   useClass: LoggingInterceptor,
  // },
];
