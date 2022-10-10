type Genre = {
  id: number;
  name: string;
};

export class MovieDto {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  genres: Genre[];
}
