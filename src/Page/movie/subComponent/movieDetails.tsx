import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { IMovie } from "../../../helper/interfaces/movieInterface";
import { fetchMovieById } from "../../../api/movie";
import { userAtom } from "../../../state/userAtom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const MovieDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [ isUserAtom ] = useAtom(userAtom);
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery<IMovie>(["movie", id], () =>
    id ? fetchMovieById(id,isUserAtom?._id as string) : Promise.reject("Movie ID is missing")
  );

  if (isLoading) {
    return <div className="h-screen">Chargement</div>;
  }

  if (isError) {
    return <div>Erreur lors de la chargement des données.</div>;
  }

  return (
    <div className="ml-8">
      <div className="flex pt-8">
        <div className="mr-4">
        <img
            src="https://e7.pngegg.com/pngimages/898/941/png-clipart-arrow-blog-arrow-angle-presentation.png"
            alt="pic"
            className="h-12"
            onClick={()=> navigate('/')}
          />
        </div>
        <div><h2 className="text-4xl ">Détails du film</h2></div>
      </div>

      <div className=" flex h-screen p-8">
        <div>
          {Object.entries(movie as IMovie).map(([k, v], index) => (
            <div className="flex">
              <div className="w-64"><p className="text-base	font-bold	italic ">{k}</p></div> <div className="w-64">{v}</div>
            </div>
          ))}
        </div>
        <div className="flex-none ">
          <img
            src="https://www.mauvais-genres.com/27882-thickbox_default/toy-story-affiche-de-film-120x160-cm-1995-tom-hanks-pixar.jpg"
            alt="pic"
            className="h-96	 w-60	 rounded-md shadow-2xl transform -translate-y-4 border-4 border-gray-300 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
