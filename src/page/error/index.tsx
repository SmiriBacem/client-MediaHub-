import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticatedUserAtom } from "../../state/authAtom";
import { useAtom } from "jotai";

const Error = () => {
  const navigate = useNavigate();
  const [isAuthenticated] = useAtom(isAuthenticatedUserAtom);
  return (
    <div className="w-screen h-screen flex justify-center align-center">
      <div className="flex-col">
        <div>
          <p>Un erreur est survenu !</p>
        </div>
        {isAuthenticated ? (
          <div onClick={() => navigate("/home")}>
            <p className="italic font-bold text-sm">Retour</p>
          </div>
        ) : (
          <div onClick={() => navigate("/")}>
            <p className="italic font-bold text-sm">Retour</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
