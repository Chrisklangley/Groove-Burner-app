import React, { useState, useEffect } from "react";
import "./FinalCover.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function DisplayFinalCover() {
  const [coverArt, setCoverArt] = useState([]);
  const [trackList, setTrackList] = useState([]);
  let [groovelistCount, setgroovelistCount] = useState(1);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logOut = () => {
    signOut();
    navigate("/");
  };

  let authState = Cookies.get("_auth_state");
  let email = JSON.parse(authState).email;
  const getCoverPlusTitle = () => {
    axios
      .get(`https://groove-burner-h2ia.onrender.com/getCover/${email}`)
      .then((res) => {
        setCoverArt(res.data);
        console.log(coverArt);
      })
      .catch((err) => console.error(err));
  };

  const getTrackList = () => {
    axios
      .get(`https://groove-burner-h2ia.onrender.com/getTrackList/${email}`)
      .then((res) => {
        console.log(res.data);
        setTrackList(res.data);
        console.log(trackList);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCoverPlusTitle();
    getTrackList();
  }, []);

  const results = trackList.map((track) => {
    return (
      <div key={track._id}>
        <p className="final-songs">
          {" "}
          {groovelistCount++} {track.song}
        </p>
      </div>
    );
  });

  return (
    <div>
      <h1 className="final-title">Here is your Groovelist!</h1>
      <div className="your-grooveList">
        <div className="your-cover">
          <img src={coverArt.groovelist_img} alt="" />
          <h3>{coverArt.groovelist_title}</h3>
        </div>
        <div className="your-tracklist">
          <h3>Track List</h3>
          {results}
        </div>
      </div>
      <div className="logOut">
        <button onClick={logOut}>log out</button>
      </div>
    </div>
  );
}

export default DisplayFinalCover;
