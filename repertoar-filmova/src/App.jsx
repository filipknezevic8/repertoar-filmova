import React, { useState, useEffect } from "react";
import Movie from "./Movie";
import "./styles/main.scss";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import MovieForm from "./MovieForm";
import EditMovieForm from "./EditMovieForm";
import { fetchMovies, deleteMovie } from "./services/movies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import Spinner from "./Spinner";

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
        <Route path="/movies/add" element={<AddMovie />}></Route>
        <Route path="/movies/:id" element={<EditMovie />}></Route>
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
        <Link to="/movies/add">Add movie</Link><br></br>
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
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [ratings, setRatings] = useState({});
  const [bestMovieTitle, setBestMovieTitle] = useState(null);

  const getMovies = async () => {
    setLoading(true)
    try {
      const data = await fetchMovies()
      setMovies(data)
    } catch (error) {
      alert(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async (id) => {
    try {
      await deleteMovie(id);
      setMovies(movies.filter(m => m.id !== id));
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    console.log("Postavka filmova");
    getMovies()

    return () => {
      console.log("Sklanjanje filmova");
    };
  }, []);

  useEffect(() => {
    let best = null;
    let bestScore = -Infinity;
    movies.forEach(m => {
      const r = ratings[m.name];
      if (!r) return;

      const score = r.likes - r.dislikes;

      if (score > bestScore) {
        bestScore = score;
        best = m.name;
      }
    });

    setBestMovieTitle(best);
  }, [ratings, movies]);

  const handleRatingChange = (name, likes, dislikes) => {
    setRatings(prev => ({
      ...prev,
      [name]: { likes, dislikes }
    }));
  };
  
  // const addNewMovie = (movie) => {
  //   console.log('data in parent', movie);
  //   setMovies(prev => [...prev, movie]);
  // };

  // const editMovie = (data) => {
  //   setMovies(prev => prev.map(element =>(element.name === data.name ? data : element)));
  //   setEditingMovie(null);
  // };

  // const bestMovie = movies.find(m => m.name === bestMovieTitle);

  return (
    <div>
      <h1>Repertoar za danas ({new Date().toLocaleDateString("sr-RS")})</h1>
      {loading && <Spinner />}
      {/* {bestMovie && (
        <div>
          <h2>Najbolje ocenjen film</h2>
          <Movie
            key={bestMovie.name}
            name={bestMovie.name}
            hall={bestMovie.hall}
            price={bestMovie.price}
            poster={bestMovie.poster}
            onEdit={() => setEditingMovie(bestMovie)}
            onRatingChange={handleRatingChange}
          />
        </div>
      )} */}
      {/* <hr/> */}
      {/* <div>
        {editingMovie ? (
          <EditMovieForm movie={editingMovie} onUpdate={editMovie} />
        ) : (
          movies
            .filter(m => m.name !== bestMovieTitle)
            .map(m => (
              <Movie
                key={m.name}
                name={m.name}
                hall={m.hall}
                price={m.price}
                poster={m.poster}
                movieId={m.id}
                onEdit={() => setEditingMovie(m)}
                onRatingChange={handleRatingChange}
              />
            ))
        )}
      </div> */}
      <div>
        {movies
            .map(m => (
              <Movie
                key={m.name}
                name={m.name}
                hall={m.hall}
                price={m.price}
                poster={m.poster}
                movieId={m.id}
                onRatingChange={handleRatingChange}
                onDelete={onDelete}
              />
            ))}
      </div>
      <br/>
      {/* {editingMovie === null && <MovieForm onSubmit={addNewMovie} />} */}
      <Link to="/movies/add">Add new movie</Link>
    </div>
  );
};

export default App;