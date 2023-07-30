import { Expose, Exclude } from 'class-transformer';
import { TodoType } from '../../data';
import {
  IsOptional,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsEnum,
  isBoolean,
} from 'class-validator';

export class CreateTodoDto {
  @IsString()
  todo: string;
  @IsEnum(TodoType)
  type: TodoType;
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  todo?: string;
  @IsOptional()
  @IsEnum(TodoType)
  type?: TodoType;
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class TodoResponseDto {
  @IsNumber()
  @Exclude()
  id: number;

  @IsBoolean()
  completed: boolean;

  @Expose({ name: 'prodoj' })
  transformTodoName() {
    return this.todo;
  }
  todo: string;

  type: TodoType;

  @Exclude()
  userId: number;

  constructor(partial: Partial<TodoResponseDto>) {
    Object.assign(this, partial);
  }
}
