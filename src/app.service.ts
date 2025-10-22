//marca la clase como servicio inyectable, así nest crea una instancia de UserService y la comparte donde se necesite (controladores, etc)
import { Injectable } from '@nestjs/common';
// decorador que permite inyectar un repository de TypeORM para la entidad user
// da acceso a métodos de db como findOne, save, create, etc
import { InjectRepository } from '@nestjs/typeorm';
//tipo que representa un repositorio de TypeORM, con todos los métodos para interactuar con la db
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
@Injectable()
export class UserService {
  // con el constructor inyectamos el repositorio de la entidad User en la propiedad userRepo.
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  //método asíncrono que guarda un usuario.
  //recibe un objeto que puede tener algunas propiedades de User (partial dice que no necesariamente todas)
  async saveUser(userData: Partial<User>): Promise<User> {
    // Partial<User> es un tipo de TypeScript que convierte todas las propiedades de User en opcionales
    // lo hacemos así porque no queremos obligar a enviar todas las propiedades de User cada vez.
    const existing = await this.userRepo.findOne({
      //busca en la db si ya existe un usuario con el mismo username
      where: { username: userData.username },
    });
    if (existing) {
      //si username existe, entonces actualiza los campos del usuario existente con los nuevos valores de userData
      //...existing --> copia todas las propiedades actuales del user
      //...userData --> sobrescribe las propiedades que vienen del cliente.
      return this.userRepo.save({ ...existing, ...userData });
    }
    //save() es un método de TypeORM que isnerta o actualiza según exista o no la entidad
    //this.userRepo.create(userData) crea una nueva instancia de User a partir de los datos proporcionados
    return this.userRepo.save(this.userRepo.create(userData));

    //necesitamos userRepo para leer, crear o actualizar los usuarios directamente desde la db
    //sin tener que excribir querys SQL manuales
    //userRepo es el puente entre el servicio y la db. Sin él, UserService no podría interactuar con la tabla User.
  }

  // método asíncrono para obtener un usuario por username
  // devuelve un User si lo encuentra, null si no lo encuentra.
  async getUser(): Promise<User | null> {
    // consulta la tabla user por la columna username
    return this.userRepo.findOne({ where: {} }); //le pasamos un objeto vacío porque solo tenemos un usuario, pero necesita que le pasemos un argumento
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    const existing = await this.userRepo.findOne({ where: {} });
    if (!existing) {
      throw new Error('User not found');
    }
    //merge de los datos nuevos con los existentes y guardamos
    return this.userRepo.save({ ...existing, ...userData });
  }

  // como solo tengo un usuario en la db, la entidad User ya está definida y existe en la tabla
  // no hace falta poner parámetros en deleteUser porque ya sabemos qué usuario eliminar, el único que hay
  async deleteUser(): Promise<User> {
    const existing = await this.userRepo.findOne({ where: {} });
    if (!existing) {
      throw new Error('User not found');
    }

    // remove() espera una entidad existente de la db, hay que pasarle objeto que venga de la db
    return this.userRepo.remove(existing);
  }
}
// Métodos de UserRepo para interactuar con la db:
// findOne() -> buscar un registro
// save() -> insertar o actualizr un registro
// create() -> crear una instancia de la entidad sin guardarla aún.
// remove() -> eliminar un registro
