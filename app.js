const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const morgan = require('morgan');
const authRouter = require('./routs/auth');
const mysql = require('mysql');
const app = express();

/*const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kxt27111',
  database: 'nodelesson'
});
connection.connect();*/

/*app.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM users',
    (error, result) => {
      if (error) throw err;
      res.status(200).json(result);
    }
  );
});*/
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.status(200).send('Hello World!');
});

app.use('/api/auth', authRouter);

module.exports = app;
