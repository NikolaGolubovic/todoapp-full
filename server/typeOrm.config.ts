import { DataSource } from 'typeorm';
import { Todo } from './src/todos/todo.entity';
import { User } from './src/users/user.entity';

export default new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'misterija',
  database: 'test',
  entities: ['dist/entities/**/*{.js,.ts}'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
});
