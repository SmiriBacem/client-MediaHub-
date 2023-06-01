import React, { useEffect, useState } from "react";
import MovieCard from "./subComponent/cardMovie";
import { IMovie } from "../../helper/interfaces/movieInterface";
import Fuse from "fuse.js";
import TriMovie from "./subComponent/triFilm";
import { fetchMovies, fetchMoviesSortedByField } from "../../api/movie";
import makeToast from "../../components/Snackbar";

const MovieList = () => {
  // c'est le texte de la recherche dans l'input
  const [searchValue, setSearchValue] = useState<string>("");
  // c'est le checkbox choisi
  const [selectedTriVal, setSelectedTriVal] = useState<string>("");
  // Liste des films par défaut
  const [movies, setMovies] = useState<IMovie[]>([]);
  // la liste des films quand vous sélectionnez un checkbox
  const [movieTri, setMoviesTri] = useState<IMovie[]>([]);

  // Appel au serveur node les films disponible
  const fetchMoviesFunc = async () => {
    try {
      const data: any = await fetchMovies();
      setMovies(data);
    } catch (error: any) {
      makeToast(
        "warning",
        error?.request?.status === 429
          ? "Vous avez dépasser la limite du nombre de requêtes à une seule requête par seconde"
          : error.response.data.message
      );
    }
  };

  // Appel au serveuc node le tri du film avec le spécifique Field
  const fetchMoviesTri = async () => {
    try {
      const data = await fetchMoviesSortedByField(selectedTriVal);
      setMoviesTri(data);
    } catch (error: any) {
      makeToast(
        "warning",
        error?.request?.status === 429
          ? "Vous avez dépasser la limite du nombre de requêtes à une seule requête par seconde"
          : error.response.data.message
      );
    }
  };

  // Appel au serveuc node le tri du film avec le spécifique Field
  const fetchMovieByTitleAndField = async () => {
    try {
      const data = await fetchMoviesSortedByField(selectedTriVal);
      setMoviesTri(data);
    } catch (error: any) {
      makeToast(
        "warning",
        error?.request?.status === 429
          ? "Vous avez dépasser la limite du nombre de requêtes à une seule requête par seconde"
          : error.response.data.message
      );
    }
  };

  useEffect(() => {
    if (movies.length === 0) {
      fetchMoviesFunc();
    }
  }, [movies]);

  useEffect(() => {
    if(selectedTriVal != ""){
        fetchMoviesTri();
    }
  }, [selectedTriVal]);


  // Lorsque vous chercher le nom du film vous chercherche ceci est le trigger du EVENT quand le user écris
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  // Nouvelle instance Fuse pour la recherche du titre spécifique
  const fuse = new Fuse(movies as any, {
    useExtendedSearch: true,
    keys: ["Title"],
  });

  const displayedMovies = selectedTriVal
    ? movieTri
    : searchValue
    ? fuse.search(searchValue).map((item) => item.item as IMovie)
    : movies;

  return (
    <div className="">
      <div className="flex gap-x-4 ml-8 pt-4">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onSearch}
            value={searchValue}
            className={`form-input w-full border-gray-400 rounded-lg w-64`}
            placeholder="Chercher votre film par nom"
          />
        </div>
        <TriMovie
          selectedTriVal={selectedTriVal}
          setSelectedTriVal={setSelectedTriVal}
        />
      </div>
      <div className="movie-list pr-8 pl-8">
        {displayedMovies.length === 0 ? (
          <div className="mt-32">
            <p className="text-black font-medium">
              Pas de film trouvé avec ce titre : {searchValue}
            </p>
          </div>
        ) : (
          displayedMovies.map((movie: IMovie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
