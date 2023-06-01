import axios from "axios";
import { movie_list_api } from ".";

export const fetchMovies = async () => {
  const response = await axios.get(movie_list_api, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("MediaHub-Token")}`,
    },
  });
  return response.data;
};

export const fetchMoviesSortedByField = async (field : string) => {
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
