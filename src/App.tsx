import React from "react";
import SignupPage from "./page/signup";
import SigninPage from "./page/signin";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedUserAtom } from "./state/authAtom";
import Dashboard from "./page/dashboard";
import "./app.style.css"
import {MovieDetails} from "./page/movie/subComponent/movieDetails";
import Historique from "./page/historique";

function App() {
  // Lire depuis l'état si l'utilisateur est connecté
  const [isAuthenticated] = useAtom(isAuthenticatedUserAtom);


  return (
    <div className="App bgApp">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
