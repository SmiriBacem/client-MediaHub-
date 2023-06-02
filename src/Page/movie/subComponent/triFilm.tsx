import React from "react";
import { TriMovieByField } from "../../../helper/constants/triMovie";
import { IMovieTri } from "../../../helper/interfaces/movieInterface";

const TriMovie: React.FC<IMovieTri> = ({
  selectedTriVal,
  setSelectedTriVal,
}) => {

  //Je veux pouvoir trier les résultats par titre, ou par la note Rotten Tomatoes, la note IMDB, ou le nombre de votes sur IMDB.
  return (
    <div
      className="flex justify-center content-center gap-x-4"
    >
      {TriMovieByField.map((e) => {
        return (
          <div className="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              onClick={() =>
                selectedTriVal === e.value
                  ? setSelectedTriVal("")
                  : setSelectedTriVal(e.value)
              }
              value={selectedTriVal}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={selectedTriVal === e.value}
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {e.key}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default TriMovie;
