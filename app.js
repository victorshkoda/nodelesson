const express = require('express');
const bodyParser = require('body-parser');
const cors = require('express-cors');
const morgan = require('morgan');
const authRouter = require('./routs/auth');
const mysql = require('mysql2/promise');
const db = require('./config/dbconf');
const app = express();

const connection = mysql.createPool(
    Object.assign({
            connectionLimit: 10,
            waitForConnections: true,
            queueLimit: 0
        },
        db
    )
);



async function go(){
    try {
        await connection.query(
            'SELECT * FROM users',
            (error, result, fields) => {
                if (error) throw err;
                console.log('db connected');
                console.log("res", result);
            });
    }catch (e) {
        console.error('SQL::ERROR:: ' + e);
        throw e
    } finally {
        await connection.release()
    }
}

go();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.status(200).send('Hello World!');
});

app.use('/api/auth', authRouter);

module.exports = app;
