import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const entity = this.moviesRepository.create(createMovieDto);

    return this.moviesRepository.save(entity);
  }

  findAll() {
    return this.moviesRepository.find();
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) throw new NotFoundException();

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    return this.moviesRepository.save({
      ...movie,
      ...updateMovieDto,
    });
  }

  async remove(id: number) {
    const movie = await this.findOne(id);

    await this.moviesRepository.remove(movie);

    return {
      ...movie,
      id,
    };
  }
}
