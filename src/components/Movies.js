import React from "react";
import { useSelector } from "react-redux";

const Movies = () => {
    const genres = useSelector((state) => state.genres);
    const movies = useSelector((state) => state.movies);
    return (
        <main className="movies">
            {genres.map((genre, i) => {
                return (
                    <div className="slider">
                        {genre.name}
                        {
                            movies.map((movie) => {
                                let correct_genre = false;
                                for (let i = 0; i < movie.genre_ids.length; i++) {
                                    if (movie.genre_ids[i] === genre.id)
                                        correct_genre = true;
                                }
                                if (correct_genre) {
                                    return (
                                        <div className="movie">
                                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}></img>
                                            <div className="title">{movie.title}</div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                )
            })}
        </main>
    )
}
export default Movies;