import { IsEmail, IsString } from 'class-validator';
import { UserValidationRules } from 'src/validations/user.validation';

export class SignUpDto extends UserValidationRules {
  @IsEmail()
  email: string;
}

export class SignInDto extends UserValidationRules {}
