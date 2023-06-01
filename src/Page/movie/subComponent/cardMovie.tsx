import React from "react";
import { IMovie } from "../../../helper/interfaces/movieInterface";

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="place-items-center font-mono mt-8">
      <div className="bg-white rounded-md  shadow-lg">
        <div className="md:flex px-4 leading-none max-w-4xl">
          <div className="flex-none ">
            <img
              src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
              alt="pic"
              className="h-56 w-40 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
            />
          </div>
          <div className="flex-col text-black">
            <p className="pt-4 text-2xl font-bold">{movie.Title} ({movie["Release Date"]})</p>
            <div className="text-md flex justify-between px-4 my-2">
              <span className="font-bold">
                {movie.Director || "Pas de directeur trouvé"} | { movie["Major Genre"] }
              </span>
              <span className="font-bold"></span>
            </div>
            <p className="hidden md:block px-4 my-4 text-sm text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>

            <p className="flex text-md px-4 my-2">
              IMDB Rating: {movie["IMDB Rating"]}/10
              <span className="font-bold px-2">|</span>
              Distributor: {movie.Distributor}
            </p>

            <div className="text-xs">
              <button
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                TRAILER
              </button>
              <button
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                IMDB
              </button>
              <button
                type="button"
                className="border border-gray-400 text-gray-400 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-900 focus:outline-none focus:shadow-outline"
              >
                AMAZON
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;