import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserListFilmViewed } from "../../api/user";
import { IMovie } from "../../helper/interfaces/movieInterface";
import { useNavigate } from "react-router-dom";

function Historique() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId?: string }>();
  const { data, isLoading, isError } = useQuery<IMovie[]>(
    ["user-film-vu", userId],
    () =>
      userId
        ? getUserListFilmViewed(userId as string)
        : Promise.reject("User identifiant est manquant")
  );

  if (isLoading) {
    return <div className="h-screen">Chargement</div>;
  }

  if (isError) {
    return <div>Erreur lors de la chargement des données.</div>;
  }
  return (
    <div className="h-screen pt-8 pl-8">
      <div>
        <div className="mr-4">
          <img
            src="https://e7.pngegg.com/pngimages/898/941/png-clipart-arrow-blog-arrow-angle-presentation.png"
            alt="pic"
            className="h-12"
            onClick={() => navigate("/home")}
          />
        </div>
      </div>
      <div className="mt-16">
        {data?.length === 0 ? (
          <div>
            <p className="weight-bold">
              Vous n'avez consulter aucun film jusqu'a maintenant.
            </p>
          </div>
        ) : (
          data?.map((e: any, index: number) => (
            <div className="mt-2" key={index}>
              <p>
                {e?.Title} {e.id}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Historique;
