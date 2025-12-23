import React from "react";

const Movie = (props) => {
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
                <div className="actions">
                    <button onClick={() => props.onReact(props.title, "Like")}>
                        Like
                    </button>
                    <button onClick={() => props.onReact(props.title, "Dislike")}>
                        Dislike
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Movie;