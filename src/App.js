import "./App.css";
import React from "react";
import SearchBar from "./components/SearchBar";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import CreateOrder from "./components/CreateOrder";
import CreateCover from "./components/CreateCover";
import DisplayFinalCover from "./components/DisplayFinalCover";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Register />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/groovelist" element={<SearchBar />} />

        <Route path="/createCover" element={<CreateCover />} />
        <Route path="/createOrder" element={<CreateOrder />} />
        <Route path="/finalCover" element={<DisplayFinalCover />} />
      </Routes>
    </div>
  );
}

export default App;
