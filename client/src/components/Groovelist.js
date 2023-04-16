import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Groovelist.css";
import Cookies from "js-cookie";

function Groovelist({ songs }) {
  const [songList, setSongList] = useState([]);
  const [total, setTotal] = useState(null);

  let authStateName = Cookies.get("_auth_state");
  const userName = JSON.parse(authStateName).name;

  let authState = Cookies.get("_auth_state");
  let email = JSON.parse(authState).email;
  const body = {
    email,
  };

  const getTotal = () => {
    axios
      .get(`http://localhost:4838/getTotal/${email}`)
      .then((res) => {
        setTotal(res.data.sum);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4838/getTotal/${email}`)
      .then((res) => {
        setTotal(res.data.sum);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [songList]);

  useEffect(() => {
    axios
      .post("http://localhost:4838/getSongs", body)
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => console.error(err));
  }, [songs]);

  const deleteSong = (e) => {
    const songId = e.target.parentElement.dataset.id;

    axios
      .delete(`http://localhost:4838/deleteSong/${songId}/${email}`)
      .then((res) => {
        setSongList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const results = songList.map((song) => {
    return (
      <p key={song.groovelist_id} data-id={song.groovelist_id}>
        {song.groovelist_song}
        <button onClick={deleteSong}>X</button>
      </p>
    );
  });

  return (
    <div className="grovelist-main">
      {songList.length !== 0 ? (
        <div className="groovelist-container">
          <div className="heading">
            <h3>
              {userName}'s Groovelist{" "}
              <h5 className="est-total" onClick={getTotal}>
                EST total:$ {total}{" "}
              </h5>
            </h3>
          </div>
          {results}
        </div>
      ) : null}
    </div>
  );
}

export default Groovelist;
