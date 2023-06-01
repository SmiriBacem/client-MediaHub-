import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IMovie } from "../../../helper/interfaces/movieInterface";
import { fetchMovieById } from "../../../api/movie";

export const MovieDetails = () => {
  const { id } = useParams<{ id?: string }>();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<IMovie>(["movie", id], () =>
    id ? fetchMovieById(id) : Promise.reject("Movie ID is missing")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching movie details.</div>;
  }

  return (
    <div className="h-screen p-8">
      <h2 className="text-4xl ">Détails du film</h2>
      <div>
      {Object.entries(movie as IMovie).map(([k,v],index) => 
         (
          <div className="flex">
            <div className="w-64">{k}</div> <div className="w-64">{v}</div>
          </div>
        )
      )}
      </div>
    </div>
  );
};
