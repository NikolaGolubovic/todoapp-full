import { TodoController } from '../todo.controller';
import { TodoService } from '../todo.service';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService();
    todoController = new TodoController(todoService);
  });

  describe('initTest', () => {
    it('should return an array of todos', async () => {
      const result = [
        { id: 1, title: 'Test', description: 'Test', type: 'hard' },
      ];
      jest.spyOn(todoService, 'initTest').mockImplementation(() => result);

      expect(todoController.initTest()).toBe(result);
    });
  });
});
