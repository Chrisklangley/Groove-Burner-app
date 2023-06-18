import React from "react";
import "./PlaylistCard.css";
import { useNavigate } from "react-router-dom";
function PlaylistCard({ playlistData }) {
  const navigate = useNavigate();
  console.log(playlistData);
  const uri = playlistData.data.uri;
  const uriParts = uri.split(":");
  const type = uriParts[1];
  const id = uriParts[2];
  const url = `https://open.spotify.com/${type}/${encodeURIComponent(id)}`;

  return (
    <a href={url} target="_blank">
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
