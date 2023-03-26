require("dotenv").config();
const { CONNECTION_STRING, SECRET } = process.env;
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

const login = async (req, res) => {
  const { username, email, password } = req.body;

  const payload = { username, email };

  const token = jwt.sign(payload, SECRET);

  try {
    const hashedPass = await bcrypt.hash(password, 10);

    const [results, metadata] = await sequelize.query(`
    SELECT user_name, password
    FROM users
    WHERE (user_name = '${email}' AND password= '${hashedPass}' );`);

    console.log(results);

    res.json({ token, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const payload = { username, email };

  const token = jwt.sign(payload, SECRET);
  try {
    const hashedPass = await bcrypt.hash(password, 10);

    await sequelize.query(
      `
  INSERT INTO users(user_name, email, password)
  VALUES('${username}', '${email}', '${hashedPass}');
  `
    );
    res.json({ token, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
  register,
};
