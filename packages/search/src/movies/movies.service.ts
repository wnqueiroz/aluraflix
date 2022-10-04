import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(createMovieDto: CreateMovieDto) {
    const response = await this.elasticsearchService.index({
      index: 'movies',
      document: {
        title: createMovieDto.title,
        genres: createMovieDto.genres,
        description: createMovieDto.description,
      },
    });

    return response;
  }

  async search(query: string) {
    const result = await this.elasticsearchService.search({
      index: 'movies',
      query: {
        multi_match: {
          query,
          fields: ['title', 'description', 'genres'],
        },
      },
    });

    return result.hits.hits.map((document) => document._source);
  }
}
