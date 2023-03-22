require("dotenv").config();
const axios = require("axios");

const getAccessToken = async (req, res) => {
//   const CLIENT_ID = process.env.CLIENT_ID;
//   const CLIENT_SECRET = process.env.CLIENT_SECRET;
//   await axios({
//     method: "post",
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
//     },
//     params: {
//       grant_type: "client_credentials",
//     },
//   })
//     .then((response) => {
//       let accessToken = response.data.access_token;

//       res.send(accessToken);
//     })
//     .catch((err) => console.error(err));
// };

module.exports = {
  getAccessToken,
};
