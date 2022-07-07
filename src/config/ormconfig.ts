import * as dotenv from 'dotenv';

dotenv.config();

const devConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,

  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  logging: true,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/migrations',
  },
};

const prodConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  logging: true,
  ssl: { rejectUnauthorized: false },

  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'dist/migrations',
  },
};

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
