import Head from "next/head";
import { useEffect, useState } from "react";

const data = require("../../data.json");

import { Movie, MovieList } from "../../components/MovieList/MovieList";

export type HomeScreenProps = {};

import * as s from "./HomeScreen.styles";

export const HomeScreen = ({}: HomeScreenProps) => {
  const max = 20;
  const maxPerList = max / 2;

  const [selectedMovie, setSelectedMovie] = useState<Movie>();

  const movies = data.slice(0, max).map(({ title, images }) => ({
    title,
    image: images.poster,
    thumbnail: images.thumbnail,
  }));

  useEffect(() => {
    setSelectedMovie(movies[0]);
  }, []);

  return (
    <>
      <s.Wrapper>
        <s.SelectedMovieSection>
          <s.SelectedMovieDetails></s.SelectedMovieDetails>

          <s.SelectedMovieCoverWrapper>
            <s.SelectedMovieCover src={selectedMovie?.thumbnail} />
          </s.SelectedMovieCoverWrapper>
        </s.SelectedMovieSection>

        <s.MoviesList>
          <MovieList
            onHoverMovie={(movie: Movie) => {
              setSelectedMovie(movie);
            }}
            movies={movies.slice(0, maxPerList)}
            title="Em alta"
          />
          <MovieList
            onHoverMovie={(movie: Movie) => {
              setSelectedMovie(movie);
            }}
            movies={movies.splice(maxPerList, maxPerList)}
            title="Sugestões para você"
          />
        </s.MoviesList>
      </s.Wrapper>
      <Head>
        <title>Aluraflix - Início</title>
      </Head>
    </>
  );
};
