require("dotenv").config();
const express = require("express");
const cors = require("cors");
const spotifyWebApi = require("spotify-web-api-node");

const { seedDB } = require("./seed.js");
const { login, register } = require("./controller");
const app = express();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

app.use(cors());
app.use(express.json());

app.post("/seed", seedDB);
app.post("/login", login);
app.post("/register", register);

app.post("/auth", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    redirectUri: redirect_uri,
    clientId: client_id,
    clientSecret: client_secret,
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
    .catch(() => {
      res.sendStatus(400);
    });
});
console.log(client_id, client_secret, redirect_uri);

const PORT = process.env.PORT || 4838;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
