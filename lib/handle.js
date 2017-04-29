const zmq = require('zeromq');

let serverSocket;

exports.initialize = (serverDir, callback) => {
  serverSocket = zmq.socket('push');
  serverSocket.connect(`tcp://${serverDir}`);
};

exports.insert = value => console.log(':D in  ', value);

exports.delete = key => console.log(':D del ', key);

exports.lookUp = key => console.log(':D look', key);

exports.exit = () => {
  console.log('Bye!');
  process.exit(0);
};
