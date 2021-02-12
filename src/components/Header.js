import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLangAction, setCurrPageAction } from "../redux"

const Header = () => {
    const [language, setLanguage] = useState("PL");
    const [sideNavVissible, setSideNavVissible] = useState(false);
    const dispatch = useDispatch();
    const setLang = lang => dispatch(setLangAction(lang));
    const setCurrPage = page => dispatch(setCurrPageAction(page));
    const lang = useSelector(state => state.lang);

    useEffect(() => {
        setLang(language);
        console.log(language);
    }, [language]);

    useEffect(() => {
        console.log(sideNavVissible);
    }, [sideNavVissible]);

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
                <div><input type="text" placeholder="search" /></div>
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