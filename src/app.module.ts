import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';
import dbConfig from './config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig as TypeOrmModuleOptions),
    UsersModule,
    AuthModule,
    CartModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
