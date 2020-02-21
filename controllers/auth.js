const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authmodel = require('../models/Auth');
const codeError = require('../config/code_errors');
const mailer = require('../utils/mailer');
const key = require('../config/key');

module.exports.users = async function (req, res) {
    const users = await authmodel.getUsers();
    socket.emit('users', users);
    res.status(200).json({users})
};

module.exports.logout = async function (req, res) {
    res.clearCookie("token").status(200).json({message: "Вы вышли!"})
};

module.exports.isLogin= async function (req, res) {
    // const mail = await mailer.mailer({});
    if(req.currentUser.email){
        const email = req.currentUser.email;
        const user = await authmodel.getUser(email);
        // await mailer.mailer(user[0]);
        res.status(200).json(user[0]);
    }else{
        console.log('No data');
        res.status(200).json({message: 'Not loginned'});
    }
};


module.exports.login = async function (req, res) {
    console.log(req.body);
    if(!req.body.email){
        res.status(401).json({message: 'No data'});
        return false;
    }
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const user = await authmodel.getUser(email);
    const token = jwt.sign({
        email: user[0].email,
        id: user[0].id
    }, key.jwt, {expiresIn: 2592000 });
    const ifPassword = bcript.compareSync(password, user[0].passwd);
    if(user.length > 0 && ifPassword){
        let expiryDate = new Date(Number(new Date()) + 2592000000);
        if(!req.cookies.token)res.cookie('token', 'Bearer'+token, { expires: expiryDate, httpOnly: true });
        res.status(200).json({user, token})
    }else{
        res.status(200).json({'message': codeError[10002], "code": "10002"});
    }
};

module.exports.register = async function (req, res) {
    const salt = bcript.genSaltSync(5);
    const password = req.body.password.trim();
    const users = await authmodel.setUsers(
      req.body.firstname.trim(),
      req.body.lastname.trim(),
      req.body.img.trim(),
      req.body.phone.trim(),
      req.body.login.trim(),
      bcript.hashSync(password, salt),
      req.body.email.trim()
    );
    console.log(users);
    let send = {};
    if(users.affectedRows){
        send = {"status": "ok"};
        res.status(201).json(send);
    }else{
        if(users.code === "ER_DUP_ENTRY"){
            send = {'message': codeError[10001], "code": "10001"}
        }else{
            send = {'error': users.message};
        }
        res.status(208).json(send);
    }
};
