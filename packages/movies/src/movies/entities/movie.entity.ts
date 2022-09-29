import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    name: 'release_date',
  })
  releaseDate: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @Column()
  certification: string;

  @Column({
    type: 'int',
  })
  runtime: number;

  @Column()
  thumbnail: string;

  @Column()
  poster: string;
}
