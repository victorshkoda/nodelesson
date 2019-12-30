const authmodel = require('../models/Auth');

module.exports.login = async function (req, res) {
    const users = await authmodel.getUsers();
    res.status(200).json({
        users
    })
};

module.exports.register = async function (req, res) {
    const users = await authmodel.setUsers(req.body.firstname, req.body.lastname, req.body.img, req.body.phone, req.body.login, req.body.passwd);
    let send = {};
    if(users.affectedRows){
        send = {"status": "ok"}
    }else{
        send = {'error': users}
    }
    res.status(200).json(send);
};
