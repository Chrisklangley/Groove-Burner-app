require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const spotifyWebApi = require("spotify-web-api-node");

const { seedDB } = require("./seed.js");
const { login, register } = require("./controller");
const app = express();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/seed", seedDB);
app.post("/login", login);
app.post("/register", register);

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refresh_token;
  const spotifyApi = new spotifyWebApi({
    clientId: "853fb1a0f68a449c9da26111a96caf27",
    clientSecret: "e165552346b24a4a86e02b99cf3cf595",
    redirectUri: "http://localhost:3000/home",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);

      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch(() => {
      res.sendStatus(400);
    });
});
app.post("/auth", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    clientId: "853fb1a0f68a449c9da26111a96caf27",
    clientSecret: "e165552346b24a4a86e02b99cf3cf595",
    redirectUri: "http://localhost:3000/home",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
console.log(client_id, client_secret, redirect_uri);

const PORT = process.env.PORT || 4838;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
