import "./App.css";
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import Homepage from "./components/Homepage";
import NavBar from "./components/NavBar";
import Register from "./components/Register";
import { Routes, Route, useNavigate } from "react-router-dom";

import Grovelist from "./components/Groovelist";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/groovelist" element={<SearchBar />} />
      </Routes>
    </div>
  );
}

export default App;
