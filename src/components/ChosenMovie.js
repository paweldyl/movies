import React from "react";
import { useSelector } from "react-redux";


const ChosenMovie = () => {
    const chosen_movie = useSelector(state => state.chosen_movie);
    return (
        <main className="chosenMovie">
            {chosen_movie.title}
        </main>
    )
}
export default ChosenMovie;