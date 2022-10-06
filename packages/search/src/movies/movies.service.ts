import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateMovieDto } from './dto/create-movie.dto';

type MovieDocument = {
  title: string;
  description: string;
  genres: string[];
};

@Injectable()
export class MoviesService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(createMovieDto: CreateMovieDto) {
    const response = await this.elasticsearchService.index({
      index: 'movies',
      document: {
        title: createMovieDto.title,
        genres: createMovieDto.genres.map((genre) => genre.name),
        description: createMovieDto.description,
        external_id: createMovieDto.id,
      },
    });

    return response;
  }

  async search(query: string) {
    const result = await this.elasticsearchService.search<MovieDocument>({
      index: 'movies',
      query: {
        multi_match: {
          query,
          fields: ['title', 'description', 'genres'],
        },
      },
      highlight: {
        fields: {
          description: {
            type: 'plain',
            number_of_fragments: 0,
            pre_tags: ['<b>'],
            post_tags: ['</b>'],
          },
        },
      },
    });

    return result.hits.hits.map(({ _source, highlight, _id }) => {
      let description = _source.description;

      if (highlight?.description.length) description = highlight.description[0];

      return {
        id: _id,
        ..._source,
        description,
      };
    });
  }
}
