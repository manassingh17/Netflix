import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames: null,
    movieResults: null,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovie: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      //console.log(movieNames);
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});

export const { toggleGptSearchView, addGptMovie } = gptSlice.actions;

export default gptSlice.reducer;
