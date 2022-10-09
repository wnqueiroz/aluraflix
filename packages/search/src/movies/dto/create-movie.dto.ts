type Genre = {
  id: number;
  name: string;
};

export class CreateMovieDto {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genres: Genre[];
}
