const bcript = require('bcryptjs');
const authmodel = require('../models/Auth');
const codeError = require('../config/code_errors');

module.exports.users = async function (req, res) {
    const users = await authmodel.getUsers();
    res.status(200).json({users})
};

module.exports.login = async function (req, res) {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
    const user = await authmodel.getUser(email);
    const ifPassword = bcript.compareSync(password, user[0].passwd);
    if(user.length > 0 && ifPassword){
        if(!req.cookies.token)res.cookie('token', Math.random());
        res.status(200).json({user})
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
