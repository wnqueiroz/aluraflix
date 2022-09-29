import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Genre } from './entities/genre.entity';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private genresRepository: Repository<Genre>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { genres } = createMovieDto;

    const entity = this.moviesRepository.create({
      ...createMovieDto,
      genres: await this.upsertGenres(genres),
    });

    return this.moviesRepository.save(entity);
  }

  findAll() {
    return this.moviesRepository.find({
      relations: ['genres'],
    });
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({
      where: {
        id,
      },
      relations: ['genres'],
    });

    if (!movie) throw new NotFoundException();

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    const { genres = [] } = updateMovieDto;

    const entity = this.moviesRepository.create({
      ...movie,
      ...updateMovieDto,
      genres: genres.length ? await this.upsertGenres(genres) : undefined,
    });

    await this.moviesRepository.save(entity);

    return this.findOne(id);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);

    await this.moviesRepository.remove(movie);

    return {
      ...movie,
      id,
    };
  }

  async upsertGenres(genres: string[]): Promise<Genre[]> {
    const entities: Genre[] = [];

    for (let i = 0; i < genres.length; i++) {
      const name = genres[i];

      const entity = await this.genresRepository.findOne({
        where: {
          name,
        },
      });

      const genre = await this.genresRepository.save({ ...entity, name });

      entities.push(genre);
    }

    return entities;
  }
}
