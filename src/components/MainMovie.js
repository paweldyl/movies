import React from "react";
import { useSelector } from "react-redux";
const MainMovie = ({ movie_info }) => {
    const movie = useSelector((state) => state.main_movie);
    return (
        <main
            className="main-movie"
            style={{ backgroundImage: `linear-gradient(rgba(11,1,51,0) 26%, rgba(20,20,20,1) 94%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
        >
            <div className="info">
                <h3 className="title">{movie.title}</h3>
                <div className="container">
                    <div className="circle">
                        {movie.vote_average}
                        <img src="star.png" />
                        <p className="how-many-ratings">{movie.vote_count} ratings </p>
                    </div>
                    <h5 onClick={() => movie_info(movie)}>Sprawdź!</h5>
                </div>
            </div>
        </main>
    )
}
export default MainMovie; 