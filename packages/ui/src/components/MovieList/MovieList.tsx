import Carousel from "react-multi-carousel";

import { MovieCard } from "../MovieCard/MovieCard";

import * as s from "./MovieList.styles";

export type Movie = {
  title: string;
  image: string;
  thumbnail: string;
};

export type MovieListProps = {
  title: string;
  movies: Array<Movie>;
  onHoverMovie(movie: Movie): void;
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1912 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 1912, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export const MovieList = ({ movies, title, onHoverMovie }: MovieListProps) => {
  return (
    <s.Wrapper>
      <s.Title>{title}</s.Title>

      <Carousel responsive={responsive} draggable={false}>
        {movies.map(({ image, ...movie }, index) => (
          <MovieCard
            image={image}
            key={index}
            onHoverMovie={() => {
              onHoverMovie({
                image,
                ...movie,
              });
            }}
          />
        ))}
      </Carousel>
    </s.Wrapper>
  );
};
