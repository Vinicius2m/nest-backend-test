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
  logging: true,
  entities: ['src/entities/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
    entitiesDir: 'src/entities',
  },
};

const prodConfig = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  logging: true,
  ssl: { rejectUnauthorized: false },

  entities: ['src/entities/*.entity.js'],
  migrations: ['src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/entities/*.entity.js',
    entitiesDir: 'src/migrations/*.js',
  },
};

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
