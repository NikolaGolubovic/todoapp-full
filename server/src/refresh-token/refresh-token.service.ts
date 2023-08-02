import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async saveRefreshToken(refreshToken: string, userId: number): Promise<void> {
    await this.refreshTokenRepository.save({
      userId,
      refreshToken,
    });
  }

  async removeOldTokens(): Promise<void> {
    const today = new Date();
    const cutoffDate = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);

    const queryBuilder = this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('createdAt < :cutoffDate', { cutoffDate });

    await queryBuilder.execute();
  }

  async createAccessToken(refreshToken: string): Promise<{ token: string }> {
    try {
      // Verify the refresh token
      const userId = await this.verifyRefreshToken(refreshToken);
      if (!userId) {
        // this.refreshTokenRepository.delete({ refreshToken });
        throw new UnauthorizedException('Invalid action, please sign up again');
      }

      // Generate a new access token
      const user = await this.usersService.findOneById(userId);
      const payload = { username: user.username, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);

      return {
        token: accessToken,
      };
    } catch (error) {
      console.log('hello');
      throw new UnauthorizedException(error.message);
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<number | null> {
    try {
      // Verify the refresh token using your token validation mechanism
      const decodedToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET,
      });
      if (
        typeof decodedToken !== 'object' ||
        !decodedToken.hasOwnProperty('sub')
      ) {
        throw new Error('Invalid token payload');
      }

      const userId = decodedToken.sub; // Assuming 'sub' contains the user ID

      return userId;
    } catch (error) {
      // Handle token verification errors
      return null;
    }
  }
}
