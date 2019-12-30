const authmodel = require('../models/Auth');

module.exports.login = async function (req, res) {
    const users = await authmodel.getUsers();
    res.status(200).json({
        users
    })
};

module.exports.register = function (req, res) {
    res.status(200).json({"register": "From controller"})
};
