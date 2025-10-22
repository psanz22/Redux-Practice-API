import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  mail: string;

  @Column()
  memberSince: Date;

  @Column()
  murders: number;

  @Column()
  craziness: number;
}
