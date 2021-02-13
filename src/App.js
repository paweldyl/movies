import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMoviesAction, setMoviesAction, setMainMovieAction, setGenresAction, setChosenMovieAction, setCurrPageAction } from "./redux";

import Header from "./components/Header";
import MainMovie from "./components/MainMovie";
import Movies from "./components/Movies";
import ChosenMovie from "./components/ChosenMovie";

function App() {
  const dispatch = useDispatch();
  const addMovies = movies => dispatch(addMoviesAction(movies));
  const setMovies = movies => dispatch(setMoviesAction(movies));
  const setMainMovie = movie => dispatch(setMainMovieAction(movie));
  const setGenres = genres => dispatch(setGenresAction(genres));
  const setChosenMovie = movie => dispatch(setChosenMovieAction(movie));
  const setCurrPage = page => dispatch(setCurrPageAction(page));
  const curr_page = useSelector(state => state.curr_page);
  const lang = useSelector(state => state.lang);
  const [currApiPage, setCurrApiPage] = useState(2);
  const [downloadNewPages, setDownloadNewPages] = useState(false);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${lang}`)
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);
      })
  }, []);

  useEffect(() => {
    const scrollApiLoader = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      if (scrollable - scrollPosition < 300 && curr_page === "MAIN") {
        setDownloadNewPages(true);
      }
    }

    if (curr_page === "MAIN") {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${lang}&page=${1}`)
        .then(response => response.json())
        .then(data => {
          setMovies(data.results);
          setMainMovie(data.results[0]);
          setCurrApiPage(2);
        })
      window.addEventListener("scroll", scrollApiLoader);
    }
    return () => window.removeEventListener("scroll", scrollApiLoader);
  }, [curr_page]);

  useEffect(() => {
    if (downloadNewPages === true && curr_page === "MAIN") {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${lang}&page=${currApiPage}`)
        .then(response => response.json())
        .then(data => {
          addMovies(data.results);
          setCurrApiPage(currApiPage + 1);
          setTimeout(() => {
            setDownloadNewPages(false);
          }, 100);
        })
    }
  }, [downloadNewPages]);

  const movie_info = (clicked_movie) => {
    setChosenMovie(clicked_movie);
    setCurrPage("CHOSEN_MOVIE");
  }

  return (
    <div className="app">
      <Header />
      {
        curr_page === "MAIN" && <MainMovie movie_info={movie_info} />
      }
      {
        curr_page === "MAIN" && <Movies movie_info={movie_info} />
      }
      {
        curr_page === "SEARCHED" && <Movies movie_info={movie_info} />
      }
      {
        curr_page === "CHOSEN_MOVIE" && <ChosenMovie />
      }
      {
        curr_page === "CATEGORIES" && <ChosenMovie />
      }

    </div>
  );
}

export default App;

