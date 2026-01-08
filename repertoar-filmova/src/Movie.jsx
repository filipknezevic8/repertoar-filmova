import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { likeMovie, dislikeMovie } from "./services/movies";

const Movie = (props) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {
        const randomLikes = Math.floor(Math.random() * 5) + 1;
        const randomDislikes = Math.floor(Math.random() * 5) + 1;

        setLikes(randomLikes);
        setDislikes(randomDislikes);
    }, []);

    useEffect(() => {
        if (props.onRatingChange) {
            props.onRatingChange(props.name, likes, dislikes);
        }
    }, [likes, dislikes]);
    
    const onLike = async () => {
        try {
            await likeMovie(props.movieId);
            setLikes(likes + 1);
        } catch (error) {
            alert(error);
        }
    };

    const onDislike = async () => {
        try {
            await dislikeMovie(props.movieId);
            setDislikes(dislikes + 1);
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="container">
            <div className="image">
                <img className="size-1" src={props.poster} alt="movie"/>
            </div>
            <div className="movie">
                <div>
                    {props.name}
                    {props.hall ? `, sala: ${props.hall}` : ", Film još uvek nije u ponudi"}
                    , cena: {props.price ? props.price : 300}din
                </div>
                <div>
                    <p>Likes: {likes}</p>
                    <p>Dislikes: {dislikes}</p>
                </div>
                <div className="actions">
                    <button onClick={() => onLike()}>
                        Like
                    </button>
                    <button onClick={() => onDislike()}>
                        Dislike
                    </button>
                </div>
                <br/>
                <div className="actions">
                    <button onClick={() => navigate(`/movies/${props.movieId}`)}>Edit</button>
                    <button onClick={() => props.onDelete(props.movieId)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Movie;