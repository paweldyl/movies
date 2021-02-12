import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Movies = ({ movie_info }) => {
    const genres = useSelector((state) => state.genres);
    const movies = useSelector((state) => state.movies);
    console.log(movies);
    return (
        <main className="movies">
            {movies.map((movie) => {
                return (
                    <div key={uuidv4()} className="movie" onClick={() => movie_info(movie)}>
                        <div className="img">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                        </div>
                        <div className="movie-title">{movie.title}</div>
                    </div>
                )
            })}
        </main>
    )
}
export default Movies;