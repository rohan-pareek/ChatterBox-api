const app = require('./app');
const PORT = 3000 || process.env.PORT;

const http = require('http');

const server = http.createServer(app);

server.listen(PORT, () => console.log(`ChatterBox server is running on port: ${PORT}`));