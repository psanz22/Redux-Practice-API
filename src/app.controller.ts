import { Controller, Get, Put, Delete, Body } from '@nestjs/common';
import { UserService } from './app.service';
import { User } from './entity/user.entity';

// En NestJS un controlador es quien se encarga de recibir las peticioines HTTP y delegarlas al servicio para que haga el trabajo.
@Controller('user') // esto significa que todas las rutas de este controlador empiezan por /user
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): Promise<User | null> {
    return this.userService.getUser();
  }

  @Put()
  //@Body obtiene los datos del cuerpo de la petición HTTP
  updateUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.updateUser(userData);
  }

  @Delete()
  deleteUser(): Promise<User | null> {
    return this.userService.deleteUser();
  }
}
