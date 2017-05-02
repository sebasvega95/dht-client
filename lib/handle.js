const chalk = require('chalk');
const zmq = require('zeromq');

const hash = require('./hash');
const messages = require('./messages');

let serverSocket, clientSocket;
let myDir;

exports.initialize = (serverDir, clientPort, dir, clUtils) => {
  serverSocket = zmq.socket('push');
  serverSocket.connect(`tcp://${serverDir}`);

  clientSocket = zmq.socket('pull');
  clientSocket.bindSync(`tcp://*:${clientPort}`);
  myDir = dir;
  clientSocket.on('message', msg => {
    msg = JSON.parse(msg);
    // Please forgive all the carriage returns :(
    if (msg.status) {
      console.log('\r\r\r\r\rOperation completed successfully');
      if (msg.value) console.log('Value:', msg.value);
      if (msg.key) console.log('Key:', msg.key);
    } else {
      console.log('\r\r\r\r\rServer says:', msg.message);
    }
    clUtils.prompt();
  });
};

exports.insert = ([value]) =>
  messages.send(serverSocket, {
    type: 'insert',
    dir: myDir,
    key: hash.getKey(value),
    value
  });

exports.delete = ([key]) =>
  messages.send(serverSocket, {
    type: 'delete',
    dir: myDir,
    key
  });

exports.lookUp = ([key]) =>
  messages.send(serverSocket, {
    type: 'look-up',
    dir: myDir,
    key
  });

exports.exit = () => {
  console.log('Bye!');
  process.exit(0);
};
