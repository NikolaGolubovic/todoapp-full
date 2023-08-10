import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SignUpDto } from "./dto/auth.dto";
import { RefreshTokenService } from "src/refresh-token/refresh-token.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
    private configService: ConfigService,
  ) {}

  async registerUser(signObject: SignUpDto): Promise<string> {
    const { username, password: pass, email } = signObject;
    const user = await this.usersService.findOne(username);
    if (user?.username === username) {
      throw new BadRequestException("user with that username already exists");
    }
    if (user?.email === email) {
      throw new BadRequestException("user with that email already exists");
    }
    const saltOrRounds = 10;
    const password = pass;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const newUser = { username, password: hash, email };
    try {
      await this.usersService.create(newUser);
    } catch (error) {
      console.log("errrorrr", error);
      new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Error while saving user",
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return `${username} is saved succesffully`;
  }
  async signIn(username: string, pass: string): Promise<any> {
    try {
      const secret = this.configService.get("JWT_SECRET");
      const user = await this.usersService.findOne(username);
      if (!user) {
        throw new UnauthorizedException("doesn't find user with that username");
      }
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new UnauthorizedException("password doesn't match");
      }
      const payload = { username: user.username, sub: user.id };

      const token = await this.jwtService.signAsync(payload, {
        expiresIn: "10d",
        secret,
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: "10d",
        secret,
      });
      await this.refreshTokenService.saveRefreshToken(refreshToken, user.id);
      return {
        token,
        refreshToken,
        username: user.username,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
