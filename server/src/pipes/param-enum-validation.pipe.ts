import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TodoType } from '../data';

@Injectable()
export class ValidateTodoTypePipe implements PipeTransform {
  readonly allowedTypes = [TodoType.EASY, TodoType.HARD];

  transform(value: any) {
    value = value;

    if (!this.isTypeValid(value)) {
      throw new BadRequestException(`${value} is an invalid todo type`);
    }

    return value;
  }

  private isTypeValid(value: any) {
    const idx = this.allowedTypes.indexOf(value);
    return idx !== -1;
  }
}
