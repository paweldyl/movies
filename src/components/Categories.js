import React from "react";
import { useSelector } from "react-redux";


const Categories = () => {
    const genres = useSelector(state => state.genres);

    return (
        <main className="categories">
        </main>
    )
}
export default Categories;