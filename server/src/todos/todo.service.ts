import { TodoType } from "../data";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  CreateTodoDto,
  TodoResponseDto,
  UpdateTodoDto,
} from "../todos/dto/todo.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Todo } from "./todo.entity";
import { User } from "../users/user.entity";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository?: Repository<TodoResponseDto>,
    @InjectRepository(User)
    private readonly userRepository?: Repository<User>,
  ) {}

  initTest() {
    const testObj = { id: 1, title: "Test", description: "Test", type: "hard" };
    return [testObj];
  }

  async findAll(type?: TodoType): Promise<TodoResponseDto[]> {
    return this.todoRepository.find({ where: { type } });
  }

  async createTodo(
    todoData: CreateTodoDto,
    username: string,
  ): Promise<CreateTodoDto> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    const newTodo: Omit<Todo, "id" | "createdAt"> = {
      userId: user.id,
      todo: todoData.todo,
      type: todoData.type,
      completed: false,
      user: { id: user.id, username: user.username, email: user.email },
    };
    console.log("aloha");
    try {
      this.todoRepository.save(newTodo);
    } catch (error) {
      new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while saving todo",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return newTodo;
  }

  async updateTodo(id: number, body: UpdateTodoDto): Promise<string> {
    const findTodo = await this.todoRepository.findOne({ where: { id } });
    const updatedContent = { ...findTodo, ...body };
    try {
      await this.todoRepository.update(id, updatedContent);
    } catch (error) {
      new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while updating todo",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return "item is successfuly updated";
  }
  async removeTodoById(id: number): Promise<string> {
    try {
      await this.todoRepository.delete(id);
    } catch (error) {
      new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while deleting todo",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return "item is successfuly removed";
  }
  async getTodosByUsername(username: string, page: number, limit: number) {
    try {
      console.log("username", username);
      const skip = (page - 1) * limit;

      const [todos, totalCount] = await this.todoRepository
        .createQueryBuilder("todo")
        .leftJoin("todo.user", "user")
        .where("user.username = :username", { username })
        .skip(skip)
        .take(limit)
        .getManyAndCount();

      const todoResponses = todos.map((todo) => {
        return new TodoResponseDto({
          completed: todo.completed,
          todo: todo.todo,
          type: todo.type,
        });
      });

      return {
        data: todoResponses,
        total: totalCount,
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while getting todos",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

// @Injectable()
// export class TodoService {
//   getAllTodos(type: TodoType): TodoResponseDto[] {
//     return todos
//       .filter((todoItem) => todoItem.type === type)
//       .map((todoItem) => {
//         const { id, completed, todo } = todoItem;
//         return new TodoResponseDto({ id, completed, todo });
//       });
//   }
//   getOneTodo(id: number): TodoResponseDto {
//     const todo = todos.filter((todoItem) => todoItem.id === id)[0];
//     return new TodoResponseDto(todo);
//   }
//   createTodo(type: TodoType, todo: string): TodoResponseDto {
//     const newTodo = {
//       id: 250,
//       todo,
//       completed: false,
//       userId: 100,
//       type,
//     };
//     todos.push(newTodo);
//     return new TodoResponseDto(newTodo);
//   }
//   updateTodo(
//     id: number,
//     body: { todo: string; type: TodoType },
//   ): TodoResponseDto {
//     const findTodo = todos.find((todo) => todo.id == id);
//     const updatedContent = { ...findTodo, ...body };
//     todos[findTodo.id - 1] = updatedContent;
//     return new TodoResponseDto({ ...findTodo, ...body });
//   }
//   removeTodo(id: number): string {
//     todos.filter((todo) => todo.id !== id);
//     return 'item is successfuly removed';
//   }
// }
