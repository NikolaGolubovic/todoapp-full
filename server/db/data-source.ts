import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";

export const dataSourceConfig: DataSourceOptions = {
  type: "postgres",
  // host: process.env.DATABASE_HOST,
  // port: Number(process.env.DATABASE_PORT || "5432"),
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  subscribers: ["dist/subscribers/**/*{.js,.ts}"],
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // synchronize: true,
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;
