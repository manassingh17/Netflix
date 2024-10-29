import React from "react";
import { Link } from "react-router-dom";

const VideoTitle = ({ title, overview ,id}) => {
  return (
    <div className="bg-gradient-to-r from-black w-full aspect-video pt-[15%] md:px-20 px-6 absolute text-white">
      <h1 className="text-xl lg:mt-0 mt-20 lg:text-5xl font-bold">{title}</h1>
      <p className="py-6 hidden  lg:inline-block text-md w-[30%]">{overview}</p>
      <div>
        <Link to={`/watch/${id}`}>
          <button className="bg-white mt-4  text-black lg:py-4 py-1 px-3 lg:px-12 text-xl hover:bg-opacity-80 rounded-lg ">
           ▶️ Play
          </button>
        </Link>
        <button className="mx-2 hidden lg:inline-block bg-gray-500 text-white p-4 px-12 text-lg bg-opacity-80 rounded-lg ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
