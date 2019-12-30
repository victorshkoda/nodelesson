const db = require('../utils/dbconnect').db;

exports.getUsers = async ()=>{
    const query = 'SELECT id, firstname, lastname, img, phone, login, passwd, birsday FROM users';
    return await db(query);
};
