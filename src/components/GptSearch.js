import React from 'react'
import { BACKGROUND_IMG_URL } from '../utils/constans';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          src={BACKGROUND_IMG_URL}
          className="brightness-[.4] h-screen object-cover lg:h-full"
          alt="backgroundimg"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
}

export default GptSearch;