type Genre = {
  id: number;
  name: string;
};
export class CreateMovieDto {
  title: string;
  description: string;
  genres: Genre[];
}
