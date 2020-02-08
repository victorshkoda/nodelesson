const authmodel = require('../models/Auth');
const codeError = require('../config/code_errors');

module.exports.users = async function (req, res) {
    const users = await authmodel.getUsers();
    res.status(200).json({
        users
    })
};

module.exports.login = async function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const user = await authmodel.getUser(email);
    if(!req.cookies.token)res.cookie('token', Math.random());
    res.status(200).json({
        user
    })
};

module.exports.register = async function (req, res) {
    const users = await authmodel.setUsers(req.body.firstname, req.body.lastname, req.body.img, req.body.phone, req.body.login, req.body.passwd, req.body.email);
    let send = {};
    if(users.affectedRows){
        send = {"status": "ok"};
        res.status(200).json(send);
    }else{
        if(users.code === "ER_DUP_ENTRY"){
            send = {'message': codeError[10001], "code": "10001"}
        }else{
            send = {'error': users.message};
        }
        res.status(208).json(send);
    }
};
