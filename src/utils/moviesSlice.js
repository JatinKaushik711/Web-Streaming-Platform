import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null, 
        popularMovies: null,
        topRated: null,
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload; 
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
          },
          addTopRated: (state, action) => {
            state.topRated = action.payload;
          },
        addTrailerVideo: (state,action) => {
            state.trailerVideo = action.payload;
        },
    },
});

export const { addNowPlayingMovies, addTrailerVideo , addPopularMovies, addTopRated} = moviesSlice.actions;

export default moviesSlice.reducer;