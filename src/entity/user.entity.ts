import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  memberSince: Date;

  @Column()
  murders: number;

  @Column()
  craziness: number;
}
