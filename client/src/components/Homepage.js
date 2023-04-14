import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Homepage.css";
import PlaylistCard from "./PlaylistCard";
import Cookies from "js-cookie";

function Homepage() {
  const [playlistData, setPlaylistData] = useState([]);
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/search/",
    params: {
      q: "vibes",
      type: "playlists",
      offset: "0",
      limit: "9",
      numberOfTopResults: "5",
    },
    headers: {
      "X-RapidAPI-Key": "e09bb0cef0mshdc6e1597af3167cp10fd05jsn41f2cd9f8081",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  let authState = Cookies.get("_auth_state");
  const userName = JSON.parse(authState).name;

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
  }, []);

  return (
    <div className="homepage">
      <h1 className="home-title">
        hey {userName}, before we get a groove on lets try find your vibe from
        one of these awesome curated playlists
      </h1>
      <h2 className="subtitle">
        once you're ready click start start a groovelist
      </h2>

      <div className="glist-container">
        <div className="glist">
          {playlistData.map((playlist, i) => {
            return (
              <div key={i}>
                <PlaylistCard playlistData={playlist} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
