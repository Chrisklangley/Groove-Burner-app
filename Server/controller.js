require("dotenv").config();
const { CONNECTION_STRING, SECRET, CLIENT_ID, CLIENT_SECRET } = process.env;
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const login = (req, res) => {
  const { username, email, password } = req.body;

  const payload = { username, email };

  const token = jwt.sign(payload, SECRET);
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  sequelize
    .query(
      `
    SELECT email, password
    FROM users
    WHERE email = '${email}' AND password = '${hash}';`
    )
    .then((user) => {
      user = user[0][0];
      if (!user) {
        return res.status(401).send("User not found");
      }

      res.json({ token, email });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const register = (req, res) => {
  const { username, email, password } = req.body;

  const payload = { username, email };

  const token = jwt.sign(payload, SECRET);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  sequelize
    .query(
      `
  INSERT INTO users(user_name, email, password)
  VALUES('${username}', '${email}', '${hash}');
  `
    )
    .then((result) => {
      res.json({ token, email, username });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  login,
  register,
};
