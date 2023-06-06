import React, { useEffect } from "react";
import SignupPage from "./page/signup";
import SigninPage from "./page/signin";
import {
  Route,
  Routes,
} from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedUserAtom } from "./state/authAtom";
import Dashboard from "./page/dashboard";
import "./app.style.css"
import {MovieDetails} from "./page/movie/subComponent/movieDetails";
import Historique from "./page/historique";
import { useNavigate } from "react-router-dom";

function App() {
  // Lire depuis l'état si l'utilisateur est connecté
  const [isAuthenticated] = useAtom(isAuthenticatedUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('MediaHub-Token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="App bgApp">
        <div>
          <Routes>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Dashboard />} />
                <Route path="/details" element={<MovieDetails />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/historique/:userId" element={<Historique />} />
              </>
            ) : (
              <Route path="*" Component={SignupPage} />
            )}
          </Routes>
        </div>
    </div>
  );
}

export default App;
