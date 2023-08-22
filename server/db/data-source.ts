import { DataSource, DataSourceOptions } from "typeorm";

console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);

console.log(
  "process.env.DATABASE_HOST",
  process.env.DATABASE_HOST,
  process.env.DATABASE_PORT,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  process.env.DATABASE_NAME,
);

export const dataSourceConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  // url: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  synchronize: true,
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;
