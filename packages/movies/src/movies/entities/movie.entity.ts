import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text', { array: true })
  genres: string[];

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
