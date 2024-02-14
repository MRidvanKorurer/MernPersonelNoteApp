import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MainContainer from "./container/MainContainer";
import Navbar from "./layouts/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";

function App() {
  const { isAuth } = useSelector((state) => state.auth);

  return (
    <div className=" bg-orange-700 min-h-screen">
      <MainContainer>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={isAuth ? <Home /> : <Navigate to={"login"} />}
            />
            <Route
              path="/login"
              element={!isAuth ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!isAuth ? <Register /> : <Navigate to={"/"} />}
            />
          </Routes>
        </BrowserRouter>
      </MainContainer>
    </div>
  );
}

export default App;
