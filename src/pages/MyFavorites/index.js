import { useEffect, useState } from "react";
import "./favorites.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function MyFavorites() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const myList = localStorage.getItem("@primeflix");
    setMovies(JSON.parse(myList) || []);
  }, []);

  function deleteFavorite(id) {
    let filterMovies = movies.filter((movie) => {
      return movie.id !== id;
    });

    setMovies(filterMovies);
    localStorage.setItem("@primeflix", JSON.stringify(filterMovies));
    toast.success("Filme removido com sucesso da sua lista de favoritos!");
  }

  return (
    <div className="my-movies">
      <h1>Meus filmes favoritos</h1>

      {movies.length === 0 && (
        <span>Você não possui nenhum filme favorito!</span>
      )}

      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                <button
                  className="btn-delete"
                  onClick={() => deleteFavorite(movie.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MyFavorites;
