import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { userAtom } from "../../state/userAtom";
import { isAuthenticatedUserAtom } from "../../state/authAtom";

function Disconnect() {
  const navigate = useNavigate();
  const [, setIsAuthenticatedUserAtom] = useAtom(isAuthenticatedUserAtom);
  const [, setIsUserAtom] = useAtom(userAtom);

  const disconnectFn = ()=>{
    localStorage.removeItem("MediaHub-Token");
    setIsAuthenticatedUserAtom(false)
    setIsUserAtom(null)
    navigate(`/`)
  }

  return (
    <div
      className="bg-blue-100 rounded cursor-pointer"
      onClick={disconnectFn}
    >
      <p className="mr-4 ml-4 ">Déconnexion</p>
    </div>
  );
}

export default Disconnect;
