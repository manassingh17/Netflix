import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTopRatedMovie } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constans";
const useTopRatedMovie = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const TopRatedMovie = useSelector((store) => store.movies.TopRatedMovie);

  const getTopRatedMovie = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addTopRatedMovie(json.results));
  };

  useEffect(() => {
    !TopRatedMovie && getTopRatedMovie(); // achieving memoization
  }, []);
};

export default useTopRatedMovie;
