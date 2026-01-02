import React, {useState} from "react";

const Movie = (props) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const onLike = async () => {
        setLikes(prev => prev + 1);
    }
    const onDislike = async () => {
        setDislikes(prev => prev + 1);
    }
    
    return (
        <div className="container">
            <div className="image">
                <img className="size-1" src={props.poster} alt="movie"/>
            </div>
            <div className="movie">
                <div>
                    {props.title}
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
            </div>
        </div>
    );
};

export default Movie;