import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserValidationRules {
  @IsString({ message: 'Please provide a valid username' })
  @MinLength(3, { message: 'Username is too short' })
  @MaxLength(15, { message: 'Username is too long' })
  username: string;

  @IsString({ message: 'Please provide a valid password' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    },
    {
      message:
        'Password must be at least 8 characters long, ' +
        'contain at least one lowercase letter, one uppercase letter, ' +
        'one number',
    },
  )
  password: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;
}
