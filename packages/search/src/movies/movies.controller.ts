import { Controller, Query, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

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

  @Get('/search')
  search(@Query('q') query: string) {
    return this.moviesService.search(query);
  }
}
