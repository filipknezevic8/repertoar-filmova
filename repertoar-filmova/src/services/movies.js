import Axios from "../apis/Axios"

export const fetchMovies = async () => {
    try {
        const response = await Axios.get('/Movies');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all movies');
    }
}

export const createMovie = async (data) => {
    try {
        const response = await Axios.post('/Movies', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create a new movie');
    }
}

export const fetchMovieById = async (movieId) => {
    try {
        const response = await Axios.get(`/Movies/${movieId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch movie by id');
    }
}

export const updateMovie = async (movieId, data) => {
    try {
        const response = await Axios.put(`/Movies/${movieId}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update movie');
    }
}

export const deleteMovie = async (movieId) => {
    try {
        const response = await Axios.delete(`/Movies/${movieId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete movie');
    }
}

export const likeMovie = async (movieId) => {
    try {
        const response = await Axios.put(`/Movies/${movieId}/like`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to like movie');
    }
}

export const dislikeMovie = async (movieId) => {
    try {
        const response = await Axios.put(`/Movies/${movieId}/dislike`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to dislike movie');
    }
}