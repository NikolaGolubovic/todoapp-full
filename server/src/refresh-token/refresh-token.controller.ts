import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api/refresh-token')
export class RefreshTokenController {
  constructor(
    private refreshService: RefreshTokenService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('')
  async refreshToken(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<{ token: string }> {
    return this.refreshService.createAccessToken(refreshToken);
  }
  @Post('/removeoldtokens')
  async removeOldTokens(): Promise<void> {
    return this.refreshService.removeOldTokens();
  }
}
