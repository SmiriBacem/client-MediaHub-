import axios from "axios";
import { movie_list_api } from ".";
import { IMovie } from "../helper/interfaces/movieInterface";

export const fetchMovies = async () => {
  const response = await axios.get(movie_list_api, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("MediaHub-Token")}`,
    },
  });
  return response.data;
};

export const fetchMoviesSortedByField = async (field: string) => {
  const response = await axios.get(
    `${movie_list_api}/movieSorted?sort=${field}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          "MediaHub-Token"
        )}`,
      },
    }
  );
  return response.data;
};

export const fetchMoviesSortedByFieldAndSearch = async (field: string) => {
  const response = await axios.get(
    `${movie_list_api}/searchAndSortMovies?query=${field}&sortBy=${field}`,
    {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem(
          "MediaHub-Token"
        )}`,
      },
    }
  );
  return response.data;
};


export const fetchMovieById = async (id: string, isUserAtom : string ): Promise<IMovie> => {
  const response = await axios.get(`${movie_list_api}/${id}/${isUserAtom}`,{
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("MediaHub-Token")}`,
    },
  });
  return response.data;
};