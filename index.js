const app = require('./app');
const http = require('http').createServer(app);
const port = process.env.PORT || 3030;
http.listen(port, () => console.log(`started on port ${port}`));
