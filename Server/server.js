require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { seedDB } = require("./Utils/seed.js");
const {
  login,
  register,
  addSong,
  getSongs,
  deleteSong,
  getTotal,
  addCover,
} = require("./controller");
const app = express();
app.use(bodyParser.json({ limit: "60mb" }));
app.use(bodyParser.urlencoded({ limit: "60mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/getTotal/:email", getTotal);

app.post("/getSongs", getSongs);
app.post("/seed", seedDB);
app.post("/login", login);
app.post("/register", register);
app.post("/addSong", addSong);
app.post("/addCover/Title/:title/:email", addCover);

app.delete("/deleteSong/:songId/:email", deleteSong);

const PORT = process.env.PORT || 4838;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
