import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Movies = ({ movie_info }) => {
    const genres = useSelector((state) => state.genres);
    const movies = useSelector((state) => state.movies);
    return (
        <main className="movies">
            {movies.length === 0 && "Nie znaleziono"}
            {movies.map((movie) => {
                if (movie.backdrop_path !== null) {
                    return (
                        <div key={uuidv4()} className="movie">
                            <div className="img" onClick={() => movie_info(movie)}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                            </div>
                            <div className="movie-title">{movie.title ? movie.title : movie.name}</div>
                        </div>
                    )
                }
            })}
        </main>
    )
}
export default Movies;