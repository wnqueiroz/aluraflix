import { Injectable, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { MovieDto } from './dto/movie.dto';

type MovieDocument = {
  id: string;
  title: string;
  description: string;
  genres: string[];
  external_id: number;
};

@Injectable()
export class MoviesService {
  private readonly index = 'movies';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async create(movieDto: MovieDto) {
    const response = await this.elasticsearchService.index({
      index: this.index,
      document: {
        title: movieDto.title,
        genres: movieDto.genres.map((genre) => genre.name),
        thumbnail: movieDto.thumbnail,
        description: movieDto.description,
        external_id: movieDto.id,
      },
    });

    return response;
  }

  async update(movieDto: MovieDto) {
    const response = await this.elasticsearchService.search({
      index: this.index,
      query: {
        match: {
          external_id: movieDto.id,
        },
      },
    });

    const [movie] = response.hits.hits;

    if (!movie) throw new NotFoundException('Movie not found');

    return this.elasticsearchService.update({
      index: this.index,
      id: movie._id,
      doc: {
        title: movieDto.title,
        genres: movieDto.genres.map((genre) => genre.name),
        thumbnail: movieDto.thumbnail,
        description: movieDto.description,
      },
    });
  }

  async remove(movieDto: MovieDto) {
    return this.elasticsearchService.deleteByQuery({
      index: this.index,
      query: {
        match: {
          external_id: movieDto.id,
        },
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
