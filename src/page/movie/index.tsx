import React, { useEffect, useState } from "react";
import MovieCard from "./subComponent/cardMovie";
import { IMovie } from "../../helper/interfaces/movieInterface";
import Fuse from "fuse.js";
import TriMovie from "./subComponent/triFilm";
import {
  fetchMovies,
  fetchMoviesSortedByField,
  fetchMoviesSortedByFieldAndSearch,
} from "../../api/movie";
import makeToast from "../../components/Snackbar";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../state/userAtom";
import { useAtom } from "jotai";
import Disconnect from "../../components/Disconnect";
import MovieSearchInput from "./MovieSearchInput";

const MovieList = () => {
  const navigate = useNavigate();
  // c'est le texte de la recherche dans l'input
  const [searchValue, setSearchValue] = useState<string>("");
  // c'est le checkbox choisi
  const [selectedTriVal, setSelectedTriVal] = useState<string>("");
  // Liste des films par défaut
  const [movies, setMovies] = useState<IMovie[]>([]);
  // la liste des films quand vous sélectionnez un checkbox
  const [movieTri, setMoviesTri] = useState<IMovie[]>([]);
  // Récupérer les données de l'utilisateur du State
  const [userAtomData] = useAtom(userAtom);

  useEffect(() => {
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
        const data = await fetchMoviesSortedByFieldAndSearch(
          searchValue,
          selectedTriVal
        );
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

    if (selectedTriVal !== "" && searchValue.length === 0) {
      fetchMoviesTri();
    } else if (selectedTriVal !== "" && searchValue !== "") {
      fetchMovieByTitleAndField();
    }
  }, [selectedTriVal, searchValue, movies]);

  useEffect(() => {
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
    if (movies.length === 0) {
      fetchMoviesFunc();
    }
  }, [movies]);

  // Lorsque vous chercher le nom du film vous chercherche ceci est le trigger du EVENT quand le user écris
  const onSearch = () => setSearchValue(searchValue);

  // Nouvelle instance Fuse pour la recherche du titre spécifique
  const fuse = new Fuse(movies as any, {
    useExtendedSearch: true,
    keys: ["Title"],
  });

  const displayedMovies =
    selectedTriVal.length === 0 && searchValue.length !== 0
      ? fuse.search(searchValue).map((item) => item.item as IMovie)
      : selectedTriVal.length !== 0 && searchValue.length === 0
      ? movieTri
      : selectedTriVal.length !== 0 && searchValue.length !== 0
      ? movieTri
      : movies;

  return (
    <div className="">
      <div className="flex gap-x-4 ml-8 pt-4">
        <div
          className="bg-teal-100 rounded cursor-pointer"
          onClick={() => navigate(`/historique/${userAtomData?._id}`)}
        >
          <p className="mr-4 ml-4 ">Visualisez vos historiques</p>
        </div>
        <MovieSearchInput
          value={searchValue}
          onChange={setSearchValue}
          onSearch={onSearch}
        />
        <TriMovie
          selectedTriVal={selectedTriVal}
          setSelectedTriVal={setSelectedTriVal}
        />
        <Disconnect />
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
