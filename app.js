const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kxt27111',
  database: 'nodelesson'
});
connection.connect();
app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, result) => {
      if (error) throw err;
      res.status(200).json(result);
    }
  );
});
module.exports = app;
