import React, { useRef, useState } from "react";
import axios from "axios";
import { API_OPTIONS, GEMINI_API_KEY } from "../utils/constans";
import { useDispatch } from "react-redux";
import { addGptMovie } from "../utils/gptSlice";
const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [loadingBtn,setLoadingBtn]=useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGeminiSearch = async () => {
    setLoadingBtn(true);
    const apiKey = GEMINI_API_KEY;
    const query =
      "Act as a movie/web-series[whatever is asked in the query] recommendation system and suggest some movies/web-series for the query:" +
      searchText.current.value +
      ".Only give me names of 10 movies/series, dont write anything extra.(if 10 movies/series are not available, give only those that are available) comma separated like the example result given ahead. Example: Koi mil gaya, avengers, om shanti om, bhootnath, don";
    //try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: query }] }],
      }
    );

    const extractedText = response.data.candidates[0].content.parts[0].text;
    console.log(extractedText);
    // } catch (error) {
    // console.error(error);
    //}
    const gptMovies = extractedText.split(",");
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    const normalizeString = (str) => str.toLowerCase().trim();

    // Filtering each inner array to only include movies where original_title matches the movie name
    const filteredResults = tmdbResults.map((movieArray, index) =>
      movieArray.filter(
        (movie) =>
          normalizeString(movie.original_title) ===
          normalizeString(gptMovies[index])
      )
    );
    console.log(tmdbResults);
   // console.log(allResults);
    console.log(filteredResults);
    dispatch(
      addGptMovie({ movieNames: gptMovies, movieResults: tmdbResults })
    );
    setLoadingBtn(false);
  };

  return (
    <div className="pt-[30%] md:pt-[5%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black grid rounded-lg grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder="What would you like to watch today?"
          className="p-4 m-4 col-span-9 rounded-full text-black"
        />
        <button
          onClick={handleGeminiSearch}
          className="col-span-3 m-4 py-2 px-2 bg-red-700 text-white text-lg hover:bg-red-800 rounded-lg md:rounded-full"
        >
          {loadingBtn ? (
            <div
              className="w-6 h-6 mx-auto border-4 border-t-4 border-t-red-600 border-gray-300 border-solid rounded-full animate-spin
"
            ></div>
          ) : (
            "Search"
          )}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
