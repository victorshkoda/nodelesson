const db = require('../utils/dbconnect').db;

exports.getUsers = async ()=>{
    const query = 'SELECT id, firstname, lastname, img, phone, login, passwd, birsday FROM users';
    return await db(query);
};

exports.setUsers = async (firstname, lastname, img, phone, login, passwd) => {
    const query = 'INSERT INTO users (firstname, lastname, img, phone, login, passwd) VALUES ("'+firstname+'", "'+ lastname+'", "'+ img+'", "'+ phone+'", "'+ login+'", "'+ passwd+'")';
    return await db(query);
};
