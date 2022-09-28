export class CreateMovieDto {
  title: string;
  description: string;
  releaseDate: string;
  genres: string[];
  certification: string;
  runtime: number;
  thumbnail: string;
  poster: string;
}
