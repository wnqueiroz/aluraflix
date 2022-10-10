type Genre = {
  id: number;
  name: string;
};

export class UpdateMovieDto {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genres: Genre[];
}
