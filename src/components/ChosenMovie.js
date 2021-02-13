import React from "react";
import { useSelector } from "react-redux";


const ChosenMovie = () => {
    const chosen_movie = useSelector(state => state.chosen_movie);
    const lang = useSelector(state => state.lang);
    const dict = useSelector(state => state.dictionary);
    return (
        <section className="chosen-movie">
            <div className="img">
                <img src={`https://image.tmdb.org/t/p/original${chosen_movie.backdrop_path}`} alt={chosen_movie.title} />
            </div>
            <div className="details">
                <div className="title">
                    <h1>{chosen_movie.title ? chosen_movie.title : chosen_movie.name}</h1>
                </div>
                <div className="rating">
                    {chosen_movie.vote_average}
                    <img src="star.png" className="star" />
                    <p className="how-many-ratings">{chosen_movie.vote_count} {dict[lang].ratings} </p>
                </div>
                <div className="overview">{chosen_movie.overview}</div>
            </div>
        </section>
    )
}
export default ChosenMovie;