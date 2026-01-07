import React from "react";
import MovieForm from "./MovieForm";
import { useNavigate } from "react-router-dom";
import { createMovie } from "./services/movies";

const AddMovie = () => {
    const navigate = useNavigate()
    
    const addNewMovie = async (movie) => {
        console.log(movie)
        const params = {
            "name": movie.name,
            "hall": movie.hall,
            "price": movie.price,
            "poster": movie.poster
        }
        try {
            await createMovie(params)
            navigate('/movies')
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Add new movie</h2>
            <MovieForm onSubmit={addNewMovie} buttonLabel="Add movie" />
        </div>
    )
}

export default AddMovie;