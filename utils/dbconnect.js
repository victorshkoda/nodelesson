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

module.exports.db = async function(query){
    const con = await connection.getConnection();
    try {
        const [result] = await con.query(query);
        return result;
    }catch (e) {
        console.error('SQL::ERROR:: ' + e);
        return 'SQL::ERROR:: ' + e
    }finally {
        await con.release();
    }
};
