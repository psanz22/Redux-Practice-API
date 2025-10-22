import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', //nombre del servicio en docker compose
      port: 5432,
      username: 'fredi',
      password: 'password123',
      database: 'redux-practice',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
