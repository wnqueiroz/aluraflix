import { Controller, Query, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * Used only by consumers
   */
  @EventPattern('movies.created')
  create(@Payload() data: CreateMovieDto) {
    return this.moviesService.create(data);
  }

  @EventPattern('movies.updated')
  update(@Payload() data: UpdateMovieDto) {
    return this.moviesService.update(data);
  }

  @Get('/search')
  search(@Query('q') query: string) {
    return this.moviesService.search(query);
  }
}
