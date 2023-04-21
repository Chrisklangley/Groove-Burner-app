import "./App.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import CreateOrder from "./components/CreateOrder";
import CreateCover from "./components/CreateCover";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/groovelist" element={<SearchBar />} />

        <Route path="/createCover" element={<CreateCover />} />

        <Route path="/createOrder" element={<CreateOrder />} />
      </Routes>
    </div>
  );
}

export default App;
