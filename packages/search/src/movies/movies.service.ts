import { Injectable, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

type MovieDocument = {
  title: string;
  description: string;
  genres: string[];
};

@Injectable()
export class MoviesService {
  private readonly index = 'movies';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(createMovieDto: CreateMovieDto) {
    const response = await this.elasticsearchService.index({
      index: this.index,
      document: {
        title: createMovieDto.title,
        genres: createMovieDto.genres.map((genre) => genre.name),
        thumbnail: createMovieDto.thumbnail,
        description: createMovieDto.description,
        external_id: createMovieDto.id,
      },
    });

    return response;
  }

  async update(updateMovieDto: UpdateMovieDto) {
    const response = await this.elasticsearchService.search({
      index: this.index,
      query: {
        match: {
          external_id: updateMovieDto.id,
        },
      },
    });

    const [movie] = response.hits.hits;

    if (!movie) throw new NotFoundException('Movie not found');

    return this.elasticsearchService.update({
      index: this.index,
      id: movie._id,
      doc: {
        title: updateMovieDto.title,
        genres: updateMovieDto.genres.map((genre) => genre.name),
        thumbnail: updateMovieDto.thumbnail,
        description: updateMovieDto.description,
      },
    });
  }

  async search(query: string) {
    const result = await this.elasticsearchService.search<MovieDocument>({
      index: this.index,
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
