import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="mt-4 xl:-mt-52 md:pl-12 px-1 relative z-20">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top-Rated-Movie"} movies={movies.TopRatedMovie} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />

          <MovieList title={"Upcoming Movies"} movies={movies.UpComingMovies} />
          <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
