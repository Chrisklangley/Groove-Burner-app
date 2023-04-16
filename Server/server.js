require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { seedDB } = require("./seed.js");
const {
  login,
  register,
  addSong,
  getSongs,
  deleteSong,
  getTotal,
} = require("./controller");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.get("/getTotal/:email", getTotal);
app.post("/getSongs", getSongs);
app.post("/seed", seedDB);
app.post("/login", login);
app.post("/register", register);
app.post("/addSong", addSong);

app.delete("/deleteSong/:songId/:email", deleteSong);

const PORT = process.env.PORT || 4838;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
