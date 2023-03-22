require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { getAccessToken } = require("./getToken");

const accessToken = process.env.ACCESS_TOKEN;

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4838;

app.get("/token", (req, res) => {
  res.status(200).send(accessToken);
});

// app.get("/access-token", async (req, res) => {
//   try {
//     const accessToken = await getAccessToken();
//     res.send(accessToken);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
