import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import Groovelist from "./Groovelist";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";
import SongResults from "./SongResults";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchDropdown, setSearchDropdown] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState([]);

  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: searchInput,
      type: "tracks",
      offset: "0",
      limit: "10",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "e09bb0cef0mshdc6e1597af3167cp10fd05jsn41f2cd9f8081",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  const submitSearchHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.request(options);
      setSearchResults(res.data.tracks.items);
    } catch (error) {
      console.error(error);
    }
  };
  let dropDown = useRef();
  useEffect(() => {
    const close = (e) => {
      if (dropDown.current && !dropDown.current.contains(e.target)) {
        setSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
  });

  return (
    <div>
      <h2 className="title-search">
        Search a Song then click it add to your Groovelist
      </h2>
      <form className="searchbar-container" onSubmit={submitSearchHandler}>
        <div className="search-bar">
          <input
            ref={dropDown}
            onClick={() => setSearchDropdown(true)}
            type="text"
            placeholder="Search a tune..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            onClick={() => setSearchDropdown(true)}
            className="search-btn"
          >
            Search
          </button>
        </div>
      </form>
      {searchDropdown && searchResults.length > 2 ? (
        <div className="result-container" ref={dropDown}>
          {searchResults.map((songs, i) => {
            return <SongResults songs={songs} setSelected={setSelectedSongs} />;
          })}
        </div>
      ) : null}
      <Groovelist songs={selectedSongs} />
    </div>
  );
}

export default SearchBar;
