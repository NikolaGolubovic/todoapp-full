import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenController } from './refresh-token.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([RefreshToken, User])],
  providers: [RefreshTokenService, UsersModule, UsersService],
  controllers: [RefreshTokenController],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
