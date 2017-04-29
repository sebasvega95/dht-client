const zmq = require('zeromq');

exports.send = (socket, load) => socket.send(JSON.stringify(load));
