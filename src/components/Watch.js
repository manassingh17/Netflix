import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constans";
import Header from "./Header";
import Logo from "../assets/Logo.png"
const Watch = () => {
  const [youtubeKey, setYoutubeKey] = useState("");
  const { movieID } = useParams();
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const media = await response.json();
      console.log(media);
      const filterData = media.results.filter(
        (video) => video.type === "Featurette"
      );
      const featuredVideo =
        filterData.length > 0 ? filterData[0] : media.results[0];
      if (!featuredVideo || !featuredVideo.key) {
        throw new Error("No teaser available");
      }
      setYoutubeKey(featuredVideo.key);
    } catch (err) {
        setError("No video found in database for this movie. Try for some other movie.");
    }
  };

  useEffect(()=>{
    fetchData();
  },[movieID])

   if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <a href="/" className="absolute  top-0 left-0 p-4 text-white z-50">
        <img className="w-44 mx-auto md:mx-0 " src={Logo} alt="logo" />
      </a>
       
      <div className=" md:h-screen w-screen bg-black">
        <iframe
          className="h-[416px] md:h-[calc(100%-0px)] w-full pt-[118px] md:pt-[70px]"
          src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Watch;
