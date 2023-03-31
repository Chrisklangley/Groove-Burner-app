require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { seedDB } = require("./seed.js");
const { login, register } = require("./controller");
const app = express();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/seed", seedDB);
app.post("/login", login);
app.post("/register", register);

const PORT = process.env.PORT || 4838;

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
