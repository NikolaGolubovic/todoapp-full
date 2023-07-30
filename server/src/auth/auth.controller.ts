import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/auth.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  createUser(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    return this.authService.registerUser(signUpDto);
  }

  @Post('login')
  signIn(@Body(new ValidationPipe()) signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
