const db = require('../utils/dbconnect').db;

exports.getUsers = async ()=>{
    const query = 'SELECT id, firstname, lastname, img, phone, login, passwd, birsday, email FROM users';
    return await db(query);
};

exports.getUser = async (email)=>{
    const query = `SELECT id, firstname, lastname, img, phone, login, passwd, birsday, email FROM users WHERE email="${email}"`;
    return await db(query);
};

exports.setUsers = async (firstname, lastname, img, phone, login, passwd, email) => {
    const query = `INSERT INTO users (firstname, lastname, img, phone, login, passwd, email) VALUES ("${firstname}", "${lastname}", "${img}", "${phone}", "${login}", "${passwd}", "${email}")`;

    return await db(query);
};
