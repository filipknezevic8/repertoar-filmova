import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import EditMovieForm from "./EditMovieForm"
import { fetchMovieById, updateMovie } from "./services/movies"

const EditMovie = () => {
    const navigate = useNavigate()
    const params = useParams()
    const movieId = params.id

    const [editingMovie, setEditingMovie] = useState(null)

    const getMovieById = async (movieId) => {
        try {
            const data = await fetchMovieById(movieId)
            setEditingMovie(data)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getMovieById(movieId)
    }, [movieId])

    const editMovie = async (movie) => {
        const params = {
            "id": movieId,
            "name": movie.name,
            "hall": movie.hall,
            "price": movie.price,
            "poster": movie.poster
        }

        try {
            await updateMovie(movieId, params)
            setEditingMovie(null)
            navigate('/movies')
        } catch (error) {
            alert(error)
        }
    }

    if (!editingMovie) {
        return <h3>Loading...</h3>
    }

    return (
        <div>
            <h2>Edit movie</h2>
            <EditMovieForm onUpdate={editMovie} movie={editingMovie} buttonLabel="Edit movie" />
        </div>
    )
}

export default EditMovie;