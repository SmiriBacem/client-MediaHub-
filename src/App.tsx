import React from "react";
import SignupPage from "./page/signup";
import SigninPage from "./page/signin";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAtom } from "jotai";
import { isAuthenticatedUserAtom } from "./state/authAtom";
import Dashboard from "./page/dashboard";
import "./app.style.css"

function App() {
  // Lire depuis l'état si l'utilisateur est connecté
  const [isAuthenticated] = useAtom(isAuthenticatedUserAtom);
  // const navigate = useNavigate();
  // const location = useLocation();

  // // vérifier à chaque fois si l'utilisateur est connecter ou pas
  // React.useEffect(() => {
  //   if (!isAuthenticated && location.pathname !== "/signin") {
  //     navigate("/signin");
  //   }
  // }, [isAuthenticated, location.pathname, navigate]);

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
