import React, { useState, useEffect } from "react";
import "./FinalCover.css";
import axios from "axios";
import Cookies from "js-cookie";

function DisplayFinalCover() {
  const [coverArt, setCoverArt] = useState([]);
  const [trackList, setTrackList] = useState([]);
  let [groovelistCount, setgroovelistCount] = useState(1);

  let authState = Cookies.get("_auth_state");
  let email = JSON.parse(authState).email;
  const getCoverPlusTitle = () => {
    axios
      .get(`http://localhost:4838/getCover/${email}`)
      .then((res) => {
        setCoverArt(res.data);
      })
      .catch((err) => console.error(err));
  };

  const getTrackList = () => {
    axios
      .get(`http://localhost:4838/getTrackList/${email}`)
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
      <div key={track.groovelist_id}>
        <p className="final-songs">
          {" "}
          {groovelistCount++} {track.groovelist_song}
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
    </div>
  );
}

export default DisplayFinalCover;
