import { Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./todos/todo.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { globalProviders } from "./constants/global.providers";
import { RefreshTokenModule } from "./refresh-token/refresh-token.module";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { dataSourceConfig } from "db/data-source";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "build"),
      serveRoot: "/",
    }),
    TodoModule,
    UsersModule,
    AuthModule,
    RefreshTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...globalProviders],
})
export class AppModule {}
