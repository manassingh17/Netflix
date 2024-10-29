import { useDispatch, useSelector } from "react-redux";
import { addMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constans";
import { useEffect } from "react";
//custom hook that fetches now playing movies and puts into redux store
const useFetchMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addMovies(json.results));
  };
  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useFetchMovies;
