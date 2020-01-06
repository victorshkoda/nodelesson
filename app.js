const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./config/cors');
const morgan = require('morgan');
const authRouter = require('./routs/auth');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors);

app.get('/', (req, res)=>{
    res.status(200).send('Hello World!');
});

app.use('/api/auth', authRouter);

module.exports = app;
