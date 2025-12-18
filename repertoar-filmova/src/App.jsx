import React from "react";
import Movie from "./Movie";
import "./styles/main.scss";

const movies = [
  {
    title: "Captain America - The First Avenger",
    hall: 2,
    price: 350
  },
  {
    title: "The Papillon",
    hall: 1,
    price: 300
  },
  {
    title: "The Lost City of Z",
    hall: 5,
    price: 350
  }
];

export default () => (
  <>
    <h1>Repertoar za danas ({new Date().toLocaleDateString("sr-RS")})</h1>
    {
      movies.map(m => (
        <Movie title={m.title} hall={m.hall} price={m.price}/>
      ))
    }
  </>
);
