import React, { useState, useEffect } from "react";
import axios from "axios";
export default function UseAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:4838/auth", { code: code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);
  useEffect(() => {
    axios
      .post("http://localhost:4838/refresh", { refreshToken })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");
      })
      .catch(() => {
        // window.location = "/home";
      });
  }, [refreshToken, expiresIn]);
  return accessToken;
}
