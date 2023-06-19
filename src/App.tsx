import React from "react";
import SignupPage from "./page/signup";
import SigninPage from "./page/signin";
import { Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedUserAtom } from "./state/authAtom";
import Dashboard from "./page/dashboard";
import "./app.style.css";
import { MovieDetails } from "./page/movie/subComponent/movieDetails";
import Historique from "./page/historique";
import Error from "./page/error";

function App() {
  const [isAuthenticated] = useAtom(isAuthenticatedUserAtom);

  return (
    <div className="App bgApp">
      <div>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Error />} />
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/details" element={<MovieDetails />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/historique/:userId" element={<Historique />} />
            </>
          ) : (
            <>
              <Route path="/" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
