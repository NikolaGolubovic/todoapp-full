import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todos/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Todo } from './todos/todo.entity';
import { globalProviders } from './constants/global.providers';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './auth/google.strategy';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'misterija',
      database: 'test',
      entities: ['dist/**/*.entity.js'],
      subscribers: ['dist/**/*.subscriber.js'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'build'),
      serveRoot: '/',
    }),
    TypeOrmModule.forFeature([User, Todo]),
    TodoModule,
    AuthModule,
    UsersModule,
    RefreshTokenModule,
    ConfigModule.forRoot(),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...globalProviders, GoogleStrategy],
})
export class AppModule {}
