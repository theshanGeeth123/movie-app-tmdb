import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Favourites from "./pages/Favourites";
import MovieDetails from "./pages/MovieDetails";

function App() {
  
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/movieDetails/:id" element={<MovieDetails />}></Route>
      </Routes>

    </>
  );
}

export default App;
