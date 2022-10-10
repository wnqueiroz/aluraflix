import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
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
    @Inject('REDIS_SERVICE') private client: ClientProxy,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { genres } = createMovieDto;

    const entity = this.moviesRepository.create({
      ...createMovieDto,
      genres: await this.upsertGenres(genres),
    });

    const movie = await this.moviesRepository.save(entity);

    await firstValueFrom(this.client.emit('movies.created', movie));

    return movie;
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

  async findSimilar(id: number) {
    const movie = await this.findOne(id);

    const genreIds = movie.genres.map((genre) => genre.id);

    const movies = await this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where('movie.id != :id', { id: movie.id })
      .andWhere('movie.certification = :certification', {
        certification: movie.certification,
      })
      .andWhere('genre.id IN (:...ids)', {
        ids: genreIds,
      })
      .limit(3)
      .orderBy('RANDOM()')
      .getMany();

    return movies;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    let movie = await this.findOne(id);

    const { genres = [] } = updateMovieDto;

    const entity = this.moviesRepository.create({
      ...movie,
      ...updateMovieDto,
      genres: genres.length ? await this.upsertGenres(genres) : undefined,
    });

    await this.moviesRepository.save(entity);

    movie = await this.findOne(id);

    await firstValueFrom(this.client.emit('movies.updated', movie));

    return movie;
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

  findGenres() {
    return this.genresRepository.find();
  }
}
