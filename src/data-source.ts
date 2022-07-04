import { DataSource, DataSourceOptions } from 'typeorm';
import dbConfig from './config/ormconfig';

export const AppDataSource: DataSource = new DataSource(
  dbConfig as DataSourceOptions,
);

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch((error) =>
    console.error('Error during Data Source initialization', error),
  );
