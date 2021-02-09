import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMoviesAction } from "./redux";

import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const dispatch = useDispatch();
  const addMovies = (movies) => dispatch(addMoviesAction(movies));
  const movies = useSelector(state => state.movies);
  const how_many_pages = 20;
  useEffect(() => {
    for (let i = 1; i <= how_many_pages; i++) {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en-US&page=${i}`)
        .then(response => response.json())
        .then(data => {
          addMovies(data.results);
        })
    }
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en-US')
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }, []);
  useEffect(() => {
    console.log(movies);
  }, [movies]);
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;

