import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Todo } from 'src/todos/todo.entity';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User, Todo])],
  providers: [UsersService, UserSubscriber],
  exports: [UsersService],
})
export class UsersModule {}
