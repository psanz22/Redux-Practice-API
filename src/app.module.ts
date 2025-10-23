import { Module } from '@nestjs/common';
import { UserController } from './app.controller';
import { UserService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      //forRoot configura la conexión global a la db, se usa una vez en AppModule
      type: 'postgres',
      host: 'db', //nombre del servicio en docker compose
      port: 5432,
      username: 'fredi',
      password: 'password123',
      database: 'redux-practice',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]), //expone los repositorios de esas entidades dentro del módulo actual, haciendo disponible el repositorio de User. Hay que usarlo en cada módulo que lo necesite.
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
