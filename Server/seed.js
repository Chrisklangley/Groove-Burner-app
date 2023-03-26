require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const seedDB = (req, res) => {
  sequelize
    .query(
      `
      DROP TABLE IF EXISTS users;

    CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(400) NOT NULL,
        email VARCHAR(400) NOT NULL,
        password VARCHAR(400) NOT NULL
    );

    `
    )
    .then(() => {
      console.log(`Database was seeded!`);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
    });
};

sequelize.authenticate().then(() => {
  console.log("Connection has been established successfully.");
});

module.exports = {
  seedDB,
};