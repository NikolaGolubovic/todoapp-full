import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { RefreshTokenModule } from "src/refresh-token/refresh-token.module";
import { ConfigModule } from "@nestjs/config";
import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [
    UsersModule,
    RefreshTokenModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60000000s" },
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
