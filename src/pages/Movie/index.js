import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./movie.css";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovie() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "pt-BR",
          },
        })
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch(() => {});
    }
    loadMovie();

    return () => {};
  }, []);

  if (loading) {
    return (
      <div className="info-movie">
        <h2>Carregando detalhes...</h2>
      </div>
    );
  }

  return (
    <div className="info-movie">
      <h1>{movie.title}</h1>
      <img
        alt={movie.titlte}
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
      />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} /10</strong>

      <div className="btns-area">
        <button>Salvar</button>
        <button>
          <a href="#">Trailer</a>
        </button>
      </div>
    </div>
  );
}

export default Movie;
