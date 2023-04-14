import React, { useState } from "react";
import axios from "axios";
import "./SongResults.css";
import Cookies from "js-cookie";

function SongResults({ songs, setSelected }) {
  let authState = Cookies.get("_auth_state");
  const newState = JSON.parse(authState);

  const email = newState.email;

  const clickedSearch = (e) => {
    console.log(e.currentTarget);

    let clicked = e.currentTarget.innerText;
    clicked = clicked.replace("\n", " ").replace("\n\n+", "");
    setSelected(clicked);

    const body = {
      clicked,
      email,
    };

    axios
      .post("http://localhost:4838/addSong", body)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="result-content" onClick={clickedSearch}>
      <p>
        {songs.data.name} <br />
        Artist: {songs.data.artists.items[0].profile.name}
      </p>
      <img
        src={songs.data.albumOfTrack.coverArt.sources[0].url}
        alt=""
        className="Search-cover-art"
      />
      <button className="add-search-btn">+</button>
    </div>
  );
}

export default SongResults;
