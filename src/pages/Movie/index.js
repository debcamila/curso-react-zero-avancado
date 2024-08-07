import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./movie.css";
import { toast } from "react-toastify";

function Movie() {
  const { id } = useParams();
  const navigation = useNavigate();
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
        .catch(() => {
          navigation("/", { replace: true });
          return;
        });
    }
    loadMovie();

    return () => {};
  }, [navigation, id]);

  function saveMovie() {
    const myList = localStorage.getItem("@primeflix");
    let moviesFavorites = JSON.parse(myList) || [];
    const hasMovie = moviesFavorites.some(
      (movieFavorite) => movieFavorite.id === movie.id
    );

    if (hasMovie) {
      toast.warn("Esse filme já se encontra na lista de favoritos!");
      return;
    }

    moviesFavorites.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(moviesFavorites));
    toast.success("Filme salvo com sucesso!");
  }

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
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://youtube.com/results?search_query=${movie.title} Trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Movie;
