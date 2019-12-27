const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconf');

const connection = mysql.createPool(
    Object.assign({
            connectionLimit: 10,
            waitForConnections: true,
            queueLimit: 0
        },
        dbconfig
    )
);

module.exports = async function dbconnect(){
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
};
