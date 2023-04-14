import React from "react";
import "./PlaylistCard.css";
import { useNavigate } from "react-router-dom";
function PlaylistCard({ playlistData }) {
  const navigate = useNavigate();
  console.log(playlistData);

  return (
    <a href={playlistData.data.uri}>
      <div className="playlist-card">
        <img
          src={playlistData.data.images.items[0].sources[0].url}
          alt=""
          className="playlist-img"
        />
        <div className="playlist-content">
          <h3>{playlistData.data.name}</h3>
          <p>Created by: {playlistData.data.owner.name}</p>
        </div>
      </div>
    </a>
  );
}

export default PlaylistCard;
