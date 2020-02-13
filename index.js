const app = require('./app');
const http = require('http').createServer(app);
const port = process.env.PORT || 3030;
const io = require('socket.io')(http);
const {sock} = require('./utils/socket');

io.on('connection', socket => {
    sock(socket);
    console.log('Socket started');
});

http.listen(port, () => console.log(`started on port ${port}`));
