import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
    popularMovies: null,
    TopRatedMovie: null,
    UpComingMovies: null,
  },
  reducers: {
    addMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },

    addTopRatedMovie: (state, action) => {
      state.TopRatedMovie = action.payload;
    },

    addUpComingMovies: (state, action) => {
      state.UpComingMovies = action.payload;
    },
  },
});

export const {
  addMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovie,
  addUpComingMovies,
} = movieSlice.actions;

export default movieSlice.reducer;
