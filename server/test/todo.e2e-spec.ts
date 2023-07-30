import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from '../src/todos/todo.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from '../src/todos/todo.entity';
import { mock } from 'node:test';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  const mockTodoRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule],
    })
      .overrideProvider(getRepositoryToken(Todo))
      .useValue(mockTodoRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('It should do something', () => {
    console.log('hello world');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/todos')
      .expect(200)
      .expect('Hello World!');
  });
});
