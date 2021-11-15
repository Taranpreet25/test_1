import { IsAlpha, isNotEmpty, IsNotEmptyObject, isNotEmptyObject, Matches } from 'class-validator';
import { Task } from 'src/tasks/task.entity';
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  @Matches(/^([a-zA-Z0-9]+\s?)*$/)
  @IsNotEmptyObject()
  @IsAlpha()
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  task: Task[];

}
