import React, { useState } from "react";
import Movie from "./Movie";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import MovieForm from "./MovieForm";
import EditMovieForm from "./EditMovieForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}>
          <Route path="app" element={<AppInfo />}></Route>
          <Route path="author" element={<AuthorInfo />}></Route>
        </Route>
        <Route path="/movies" element={<Movies />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link><br></br>
        <Link to="/about">About</Link><br></br>
        <Link to="/about/app">App</Link><br></br>
        <Link to="/about/author">Author</Link><br></br>
        <Link to="/movies">Movies</Link><br></br>
      </nav>
    </header>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>Filip Knežević</p>
    </footer>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Dobrodošli na početnu stranicu!</h1>
      <img className="size-2" alt="welcome" src="https://as1.ftcdn.net/v2/jpg/00/61/64/74/1000_F_61647429_lX4dJ7kiOoqlVf7a13j2Tft94MLpzWOa.jpg" />
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h2>O aplikaciji</h2>
      <p>
        Ova aplikacija prikazuje dnevni repertoar filmova u bioskopu,
        sa osnovnim informacijama o filmovima, salama i cenama karata.
      </p>
      <img className="size-2" alt="film" src="https://img.pixers.pics/pho_wat(s3:700/FO/39/27/95/69/700_FO39279569_445d8507036eb64772b002d6888909fc.jpg,700,550,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,500,jpg)/stickers-cinema-clapper-and-film-tape.jpg.jpg" />
      <Outlet />
    </div>
  );
};

const AppInfo = () => {
  return (
    <div>
      <h2>Par rečenica o aplikaciji</h2>
      <p>
        Ova aplikacija prikazuje repertoar filmova u bioskopu i omogućava
        korisnicima da pregledaju dostupne filmove, njihove sale i cene karata.
        Takođe, korisnicima je omogućeno i da ostave reakciju na svaki film.
      </p>
    </div>
  );
};

const AuthorInfo = () => {
  return (
    <div>
      <h2>O autoru</h2>
      <p>
        Ime: Filip Knežević<br></br>
        Datum rođenja: 26. oktobar 2001.<br></br>
        Mesto rođenja: Novi Sad<br></br>
      </p>
    </div>
  );
};

const Movies = () => {
  const [editingMovie, setEditingMovie] = useState(null);
  
  const [movies, setMovies] = useState([
    {
      title: "Captain America - The First Avenger",
      hall: 2,
      price: 350,
      poster: "https://m.media-amazon.com/images/I/51Xp+8qDCbL._AC_UF350,350_QL50_.jpg"
    },
    {
      title: "The Papillon",
      hall: 1,
      price: 300,
      poster: "https://m.media-amazon.com/images/M/MV5BMjIxMTMyOTE2NF5BMl5BanBnXkFtZTgwMDYyNzY1NTM@._V1_.jpg"
    },
    {
      title: "The Lost City of Z",
      hall: 5,
      price: 350,
      poster: "https://m.media-amazon.com/images/M/MV5BZmU2ODIyMWItMjU3Zi00ZmVhLWIyNDAtMWE5OWU2ZDExMGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
      title: "Klaus",
      hall: 3,
      poster: "https://m.media-amazon.com/images/I/7128yjOjl9L.jpg"
    },
    {
      title: "Bullet Train",
      poster: "https://m.media-amazon.com/images/I/71INz6LX8aL._AC_UF894,1000_QL80_.jpg"
    }
  ]);

  const addNewMovie = (movie) => {
    console.log('data in parent', movie);
    setMovies(prev => [...prev, movie]);
  };

  const editMovie = (data) => {
    setMovies(prev => prev.map(element =>(element.title === data.title ? data : element)));
    setEditingMovie(null);
  };

  return (
    <div>
      <h1>Repertoar za danas ({new Date().toLocaleDateString("sr-RS")})</h1>
      <div>
        {editingMovie ? (<EditMovieForm movie={editingMovie} onUpdate={editMovie} />) :
        (movies.map(m => (
          <Movie key={m.title} title={m.title} hall={m.hall} price={m.price} poster={m.poster} onEdit={() => setEditingMovie(m)} />
        )))
        }
      </div>
      <br/>
      {editingMovie === null && <MovieForm onSubmit={addNewMovie} />}
    </div>
  );
};

export default App;