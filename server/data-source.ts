import { DataSource, DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'misterija',
  database: 'test',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/**/*{.js,.ts}'],
};

const dataSource = new DataSource(DataSourceConfig);
export default dataSource;
