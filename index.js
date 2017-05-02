const chalk = require('chalk');
const clUtils = require('command-node');
const ip = require('ip');
const readline = require('readline');

const handle = require('./lib/handle');
const validate = require('./lib/validate');

let commands = {
  insert: {
    parameters: ['value'],
    description: 'Insert value to the DHT',
    handler: handle.insert
  },
  delete: {
    parameters: ['key'],
    description: 'Delete a value from the DHT given its key',
    handler: handle.delete
  },
  'look-up': {
    parameters: ['key'],
    description: 'Get a value from the DHT given its key',
    handler: handle.lookUp
  },
  exit: {
    parameters: [],
    description: 'Quit the program',
    handler: handle.exit
  }
};

console.log(chalk.blue('Welcome to DHT!'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the direction of the server? ', serverDir => {
  if (!serverDir) {
    console.log(chalk.red('error'), 'You must provide a direction');
    process.exit(1);
  } else if (!validate.dir(serverDir)) {
    console.log(chalk.red('error'), 'Invalid server direction');
    process.exit(1);
  }
  rl.question('Listen on which port? ', port => {
    let dir = `${ip.address()}:${port}`;
    if (!port) {
      console.log(chalk.red('error'), 'You must provide a port');
      process.exit(1);
    } else if (!validate.dir(dir)) {
      console.log(chalk.red('error'), 'Invalid port');
      process.exit(1);
    }
    rl.close();

    clUtils.initialize(commands, 'DHT' + chalk.green('>') + ' ');
    handle.initialize(serverDir, port, dir, clUtils);
  });
});
