"use strict";

const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  prot: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
});

db.connect();

module.exports = db;
