import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMoviesAction, setMainMovieAction, setGenresAction } from "./redux";

import Header from "./components/Header";
import MainMovie from "./components/MainMovie";
import Movies from "./components/Movies";
import SearchedMovies from "./components/SearchedMovies";
import ChosenMovie from "./components/ChosenMovie";

function App() {
  const dispatch = useDispatch();
  const addMovies = (movies) => dispatch(addMoviesAction(movies));
  const setMainMovie = (movie) => dispatch(setMainMovieAction(movie));
  const setGenres = (genres) => dispatch(setGenresAction(genres));
  const movies = useSelector(state => state.movies);
  const how_many_pages = 5;
  useEffect(() => {
    for (let i = 1; i <= how_many_pages; i++) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en-US&page=${i}`)
        .then(response => response.json())
        .then(data => {
          addMovies(data.results);
          if (i === 1)
            setMainMovie(data.results[0]);
        })
    }

    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en-US')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(Array.isArray(data.genres));
        setGenres(data.genres);
      })

  }, []);
  useEffect(() => {
    //console.log(movies);
  }, [movies]);
  return (
    <div className="app">
      <Header />
      <MainMovie />
      <Movies />
      <SearchedMovies />
      <ChosenMovie />
    </div>
  );
}

export default App;

