import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLangAction, setCurrPageAction, setMoviesAction, addMoviesAction, setChosenMovieAction } from "../redux"

const Header = () => {
    const [language, setLanguage] = useState("en");
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const setLang = lang => dispatch(setLangAction(lang));
    const setCurrPage = page => dispatch(setCurrPageAction(page));
    const setMovies = movies => dispatch(setMoviesAction(movies));
    const addMovies = movies => dispatch(addMoviesAction(movies));
    const setChosenMovie = movie => dispatch(setChosenMovieAction(movie));
    const chosen_movie = useSelector(state => state.chosen_movie);
    const lang = useSelector(state => state.lang);
    const dict = useSelector(state => state.dictionary);
    const curr_page = useSelector(state => state.curr_page);

    useEffect(() => {
        setLang(language);
        if (curr_page === "CHOSEN_MOVIE") {
        }
        switch (curr_page) {
            case "CHOSEN_MOVIE":
                fetch(`https://api.themoviedb.org/3/movie/${chosen_movie.id}?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${language}`)
                    .then(response => response.json())
                    .then(data => {
                        setChosenMovie(data);
                        console.log(data);
                    });
                break;
            case "MAIN":
                fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${language}&page=${1}`)
                    .then(response => response.json())
                    .then(data => {
                        setMovies(data.results);
                    });
                break;
            case "SEARCHED":
                fetch(`https://api.themoviedb.org/3/search/tv?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${language}&page=1&include_adult=false&query=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        setMovies(data.results);
                    });
                fetch(`https://api.themoviedb.org/3/search/movie?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${language}&page=1&include_adult=false&query=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        addMovies(data.results);
                    });
                break;
        }
    }, [language]);
    const handle_search = (event) => {
        const sentence = event.target.value.trim().replace(/\s/g, '+');
        setQuery(event.target.value);
        if (event.target.value.trim() === "") {
            setCurrPage("MAIN");
        }
        else {
            setCurrPage("SEARCHED");
            setMovies("0");
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${lang}&page=1&include_adult=false&query=${sentence}`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                });
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=${lang}&page=1&include_adult=false&query=${sentence}`)
                .then(response => response.json())
                .then(data => {
                    addMovies(data.results);
                });
        }
    }
    return (
        <header className="header">
            <div className="logo" onClick={() => setCurrPage("MAIN")}>Movies</div>
            <div className="top-menu">
                <div>
                    <input type="text" placeholder={dict[lang].search} value={query} onChange={handle_search} />
                </div>
                <div className="language">
                    <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                        <option value="en">English</option>
                        <option value="pl">Polski</option>
                    </select>
                </div>
            </div>
        </header>
    )
}
export default Header;