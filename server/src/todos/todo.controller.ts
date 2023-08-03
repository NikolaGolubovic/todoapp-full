import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  UseGuards,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateTodoDto, UpdateTodoDto } from '../todos/dto/todo.dto';
import { TodoService } from './todo.service';
import '../global';
import { RequestUser } from '../users/user.decorator';

import { User } from '../users/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('api/todos/')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // @UseGuards(AuthGuard)
  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }

  // @Get(':type')
  // async getTodosByType(@Param('type', ValidateTodoTypePipe) type: string) {
  //   const typeTodo = type === 'hard' ? TodoType.HARD : TodoType.EASY;
  //   return this.todoService.findAll(typeTodo);
  // }

  @Get('user/')
  getTodosByUsername(
    @Query('username', new ValidationPipe({ transform: true }))
    validatedUsername: string,
    @Query('page', new ValidationPipe({ transform: true })) page: number,
    @Query('limit', new ValidationPipe({ transform: true })) limit: number,
  ) {
    console.log(validatedUsername, page, limit);
    return this.todoService.getTodosByUsername(validatedUsername, page, limit);
  }

  @UseGuards(AuthGuard)
  @Post()
  createTodo(
    @Body(new ValidationPipe()) body: CreateTodoDto,
    @RequestUser() user: User,
  ): Promise<CreateTodoDto> {
    return this.todoService.createTodo(body, user.username);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  updateTodo(
    @Param('id', new ValidationPipe({ transform: true })) validatedId: number,
    @Body(new ValidationPipe()) body: UpdateTodoDto,
  ): Promise<string> {
    return this.todoService.updateTodo(validatedId, body);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Delete(':id')
  removeTodo(
    @Param('id', new ValidationPipe({ transform: true })) validatedId: number,
  ) {
    return this.todoService.removeTodoById(validatedId);
  }
}
// @Get()
// getAllTodos(@Param('type', new ParseEnumPipe(TodoType)) type: string) {
//   const typeTodo = type === 'hard' ? TodoType.HARD : TodoType.EASY;
//   return this.todoService.getAllTodos(typeTodo);
// }
// @Get(':id')
// getOneTodo(
//   @Param('type', new ParseEnumPipe(TodoType)) type: string,
//   @Param('id', ParseIntPipe) id: number,
// ) {
//   const typeTodo = 'hard' ? TodoType.HARD : TodoType.EASY;
//   return this.todoService.getOneTodo(id);
// }
// @Post()
// createTodo(
//   @Body() { todo }: { todo: string },
//   @Param('type', new ParseEnumPipe(TodoType)) type: string,
// ): TodoResponseDto {
//   const todoType = type === 'hard' ? TodoType.HARD : TodoType.EASY;
//   return this.todoService.createTodo({});
// }
// @Put(':id')
// updateTodo(
//   @Param('id', ParseIntPipe) id: number,
//   @Body() body: { todo: string; type: TodoType },
// ): TodoResponseDto {
//   return this.todoService.updateTodo(id, body);
// }
// @HttpCode(204)
// @Delete(':id')
// removeTodo(@Param('id', ParseIntPipe) id: number): string {
//   return this.todoService.removeTodo(id);
// }
