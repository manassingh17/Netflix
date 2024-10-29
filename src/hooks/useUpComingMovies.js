import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpComingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constans";

const useUpComingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();
  const ComingMovies = useSelector((store) => store.movies.UpComingMovies);

  const getUpComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    dispatch(addUpComingMovies(json.results));
  };

  useEffect(() => {
   !ComingMovies&& getUpComingMovies(); 
  }, []);
};

export default useUpComingMovies;
