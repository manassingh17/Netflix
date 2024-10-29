import React from "react";
import { useSelector } from "react-redux";
import VideoBg from "./VideoBg";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;

  const mainMovie = movies[3];

  const { original_title, overview,id } = mainMovie;
  return (
    <div className="pt-[22%] md:pt-0">
      <VideoTitle title={original_title} overview={overview} id={id} />
      <VideoBg id={id} />
    </div>
  );
};

export default MainContainer;
