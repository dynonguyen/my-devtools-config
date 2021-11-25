const express = require('express');
const server = express();
const path = require('path');

/* ============== Config =============== */
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());
server.use(express.urlencoded({}));

/* ============== Routes =============== */

/* ============== Listening =============== */
const normalizePort = (port) => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3000);

server.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
