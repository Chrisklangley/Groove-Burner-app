import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Groovelist.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Groovelist({ songs }) {
  const [songList, setSongList] = useState([]);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();

  let authStateName = Cookies.get("_auth_state");
  const userName = JSON.parse(authStateName).name;

  let authState = Cookies.get("_auth_state");
  let email = JSON.parse(authState).email;
  const body = {
    email,
  };

  const getTotal = () => {
    axios
      .get(`https://groove-burner-h2ia.onrender.com/getTotal/${email}`)
      .then((res) => {
        setTotal(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getTrackList();
    axios
      .get(`https://groove-burner-h2ia.onrender.com/getTotal/${email}`)
      .then((res) => {
        setTotal(res.data.total);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [songList]);

  useEffect(() => {
    axios
      .post("https://groove-burner-h2ia.onrender.com/getSongs", body)
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => console.error(err));
  }, [songs]);

  const getTrackList = () => {
    axios
      .get(`https://groove-burner-h2ia.onrender.com/getTrackList/${email}`)
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => console.error(err));
  };

  const deleteSong = (e) => {
    const songId = e.target.parentElement.dataset.id;

    axios
      .delete(
        `https://groove-burner-h2ia.onrender.com/deleteSong/${songId}/${email}`
      )
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const results = songList.map((song) => {
    return (
      <p key={song._id} data-id={song._id}>
        {song.song}
        <button onClick={deleteSong}>X</button>
      </p>
    );
  });

  return (
    <div className="grovelist-main">
      {songList.length !== 0 ? (
        <div className="groovelist-container">
          <div className="heading">
            <h3>{userName}'s Groovelist </h3>
            <div className="total-submit">
              <h5 className="est-total" onClick={getTotal}>
                EST total:$ {total}
              </h5>
              <button onClick={() => navigate("/createCover")}>
                add songs
              </button>
            </div>
          </div>

          {results}
        </div>
      ) : null}
    </div>
  );
}

export default Groovelist;
