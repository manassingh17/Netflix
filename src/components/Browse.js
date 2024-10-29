import React, { useEffect } from "react";
import Header from "./Header";
import useFetchMovies from "../hooks/useFetchMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovie from "../hooks/useTopRatedMovie";
import useUpComingMovies from "../hooks/useUpComingMovies";
import ShimmerEffect from "./ShimmerEffect";

const Browse = () => {
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  useFetchMovies();
  usePopularMovies();
  useTopRatedMovie();
  useUpComingMovies();
  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          {movies?.length > 0 ? (
            <>
              <MainContainer />
              <SecondaryContainer />
              
            </>
          ) : (
            <ShimmerEffect />
            
          )}
        </>
      )}
    </div>
  );
};

export default Browse;
