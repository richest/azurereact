require("dotenv").config(); // this line is important!

const { database } = require("../config/index")();

const { username, password, dbName, host } = database;

module.exports = {
  development: {
    username,
    password,
    database: dbName,
    host: host,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000000,
    },
  },
  production: {
    username,
    password,
    database: dbName,
    host,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000000,
    },
  },
};
