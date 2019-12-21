const express = require('express');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kxt27111',
    database : 'nodelesson'
});
connection.connect();
app.get('/', (req, res)=>{
    connection.query(
        'SELECT * FROM users',
        (error, result)=>{
            if(error) throw err;
            const users = {};
            for(let i = 0; i < result.length; i++){
                users[result[i]['id']] = result[i];
            }
            console.log(JSON.stringify(users));
        }
    );
    res.end('Hello!!!');
});
app.listen(3300, ()=>{
    console.log('started on port 3300');
});
