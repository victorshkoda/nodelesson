const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const morgan = require('morgan');
const authRouter = require('./routs/auth');
const connect = require('./utils/dbconnect');
const app = express();

connect();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.status(200).send('Hello World!');
});

app.use('/api/auth', authRouter);

module.exports = app;
