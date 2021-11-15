const express = require('express');
const server = express();
const path = require('path');
const mainRoute = require('./routes/index');

/* ============== Config =============== */
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({}));

/* ============== Routes =============== */
server.use('/', mainRoute);

/* ============== Listening =============== */
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
