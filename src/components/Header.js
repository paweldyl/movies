import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLangAction, setCurrPageAction, setMoviesAction, addMoviesAction } from "../redux"

const Header = () => {
    const [language, setLanguage] = useState("PL");
    const [sideNavVissible, setSideNavVissible] = useState(false);
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const setLang = lang => dispatch(setLangAction(lang));
    const setCurrPage = page => dispatch(setCurrPageAction(page));
    const setMovies = movies => dispatch(setMoviesAction(movies));
    const addMovies = movies => dispatch(addMoviesAction(movies));
    const lang = useSelector(state => state.lang);

    useEffect(() => {
        setLang(language);
    }, [language]);
    const handle_search = (event) => {
        setQuery(event.target.value);
        if (event.target.value === "") {
            setCurrPage("MAIN");
            console.log("nic nie ma")
        }
        else {
            let sentence = event.target.value.trim().replace(/\s/g, '+');
            setCurrPage("SEARCHED");
            setMovies("0");
            console.log(sentence);
            fetch(`https://api.themoviedb.org/3/search/tv?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en&page=1&include_adult=false&query=${sentence}`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                    console.log(data);
                });
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=2cdaf6cbedf866a6ab6174b0475811f4&language=en&page=1&include_adult=false&query=${sentence}`)
                .then(response => response.json())
                .then(data => {
                    addMovies(data.results);
                    console.log(data);
                });
        }
    }
    return (
        <header className={sideNavVissible ? "header active" : "header"}>
            <div className="dark-zone" onClick={() => setSideNavVissible(!sideNavVissible)}></div>
            <div className="logo" onClick={() => setCurrPage("MAIN")}>Movies</div>
            <div className="burger-menu" onClick={() => setSideNavVissible(!sideNavVissible)}>
                <div className="line one"></div>
                <div className="line two"></div>
                <div className="line three"></div>
            </div>
            <div className="top-menu">
                <div>
                    <input type="text" placeholder="search" value={query} onChange={handle_search} />
                </div>
                <div className="categories">categories</div>
                <div className="language">
                    <label htmlFor="lang">language:</label>
                    <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                        <option value="PL">Polski</option>
                        <option value="ENG">English</option>
                    </select>
                </div>
            </div>
            <div className="side-menu">
                <div className="search" onClick={() => setSideNavVissible(!sideNavVissible)}>search</div>
                <div className="categories" onClick={() => setSideNavVissible(!sideNavVissible)}>categories</div>
                <div className="language">
                    <label htmlFor="lang">language:</label>
                    <select value={language} onChange={(event) => setLanguage(event.target.value)}>
                        <option value="PL">Polski</option>
                        <option value="ENG">English</option>
                    </select>
                </div>
            </div>
        </header>
    )
}
export default Header;