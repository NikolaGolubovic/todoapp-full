import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserValidationRules } from '../validations/user.validation';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  async transform(value: any): Promise<UserValidationRules> {
    const user = plainToClass(UserValidationRules, value);
    const errors = await validate(user);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return user;
  }
}
