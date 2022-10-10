import { Controller, Query, Get } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  /**
   * Used only by consumers
   */
  @EventPattern('movies.created')
  create(@Payload() data: MovieDto) {
    return this.moviesService.create(data);
  }

  @EventPattern('movies.updated')
  update(@Payload() data: MovieDto) {
    return this.moviesService.update(data);
  }

  @EventPattern('movies.deleted')
  remove(@Payload() data: MovieDto) {
    return this.moviesService.remove(data);
  }

  @Get('/search')
  search(@Query('q') query: string) {
    return this.moviesService.search(query);
  }
}
