const authmodel = require('../models/Auth');

module.exports.login = async function (req, res) {
    console.log('Cookie: ', req.cookies.token)
    const users = await authmodel.getUsers();
    if(!req.cookies.token)res.cookie('token', Math.random());
    res.status(200).json({
        users
    })
};

module.exports.register = async function (req, res) {
    const users = await authmodel.setUsers(req.body.firstname, req.body.lastname, req.body.img, req.body.phone, req.body.login, req.body.passwd);
    let send = {};
    if(users.affectedRows){
        send = {"status": "ok"};
        res.status(200).json(send);
    }else{
        send = {'error': users};
        res.status(208).json(send);
    }

};
