import React, { useState, useEffect } from "react";
import "./Homepage.css";
import PlaylistCard from "./PlaylistCard";
import Cookies from "js-cookie";
import axios from "axios";

function Homepage() {
  const [playlistData, setPlaylistData] = useState([]);
  const [genre, setGenre] = useState("vibes");

  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: genre,
      type: "playlists",
      offset: "0",
      limit: "20",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "74233648d1msha948e959543800ep130f18jsn35b79b171aee",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  let authState = Cookies.get("_auth_state");
  const { name } = JSON.parse(authState) || {};
  const greeting = name ? `Hello, ${name}!` : "Hello!";

  const getPlaylist = async () => {
    try {
      const response = await axios(options);
      setPlaylistData(response.data.playlists.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [genre]);

  return (
    <div className="homepage">
      <h1 className="home-title">
        {greeting} before we get a groove on let's try to find your vibe from
        one of these awesome curated playlists
      </h1>
      <h2 className="subtitle">
        Once you're ready, click "Start a Groovelist"
      </h2>
      <div className="genre-change">
        <h4>Change the vibe</h4>
        <select name="genre" id="" onChange={(e) => setGenre(e.target.value)}>
          <option value="pop">Pop</option>
          <option value="Hip hop">Hip-Hop</option>
          <option value="R&B/soul">R&B/soul</option>
          <option value="Electronic/dance">Electronic/dance</option>
          <option value="Jazz">Jazz</option>
          <option value="Classical">Classical</option>
        </select>
      </div>

      <div className="glist-container">
        <div className="glist">
          {playlistData.map((playlist, i) => (
            <div key={i}>
              <PlaylistCard playlistData={playlist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
