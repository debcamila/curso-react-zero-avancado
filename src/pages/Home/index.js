import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "ae2fbbc66753c79eeea1a9634685563c",
          language: "pt-BR",
          page: 1,
        },
      });
      setMovies(response.data.results.slice(0, 10));
    }
    loadMovies();
  }, []);

  return (
    <div className="container">
      <div className="movies-list">
        {movies.map((movie) => {
          return (
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img
                alt={movie.titlte}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
              <Link to={`movie/${movie.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
