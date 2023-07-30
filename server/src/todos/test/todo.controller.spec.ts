import { Test } from '@nestjs/testing';
import { TodoController } from 'src/todos/todo.controller';
import { TodoService } from 'src/todos/todo.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TodoType } from 'src/data';
import { User } from 'src/users/user.entity';

describe('CatsController', () => {
  let todosController: TodoController;

  const mockUsersService = {
    createTodo: jest.fn((dto) => {
      return { id: Date.now(), ...dto };
    }),
    updateTodo: jest.fn().mockImplementation((id, dto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    })
      .overrideProvider(TodoService)
      .useValue(mockUsersService)
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    todosController = moduleRef.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
  });

  it('should create a todo', () => {
    const userMock: User = {
      username: 'nikola',
      password: 'misterija',
      id: 1,
      todos: [],
      createdAt: new Date(),
      email: 'nikola@gmail.com',
    };
    const todo = { todo: 'Test', type: TodoType.HARD, completed: false };

    expect(todosController.createTodo(todo, userMock)).toEqual({
      id: expect.any(Number),
      ...todo,
    });

    expect(mockUsersService.createTodo).toHaveBeenCalledWith(todo, userMock.username);
  });

  it('should update a todo', () => {
    const updateMock = {
      type: TodoType.EASY,
    };
    expect(todosController.updateTodo(1, updateMock)).toEqual({
      id: 1,
      ...updateMock,
    });
  });
});
