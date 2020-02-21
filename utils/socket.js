const authmodel = require('../models/Auth');

module.exports.sock = (socket) => {
    socket.on('login', async (data) => {
        console.log(data);
        let sendUser = {message: "Not found user"};
        const user = await authmodel.getUser(data);
        if(user.length > 0){
            sendUser = user[0];
        }
        socket.emit('status', sendUser);
        return socket;
    });
};



