const { Server } = require('ws');
const path = require('path');
const chokidar = require('chokidar');

const server = new Server({ port: 4444 });
let _client = null;

server.on('connection', client => {
	_client = client;
});

chokidar.watch(path.resolve(__dirname, '..', '..', 'build')).on('all', () => {
	_client?.send('reload');
});

console.log('Hot reload server started on port 4444');
