import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const devConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  migrations: ['../migrations/**/*.*'],
} as TypeOrmModuleOptions;

const prodConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  ssl: { rejectUnauthorized: false },
  autoLoadEntities: true,
  migrations: ['../migrations/**/*.*'],
} as TypeOrmModuleOptions;

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
