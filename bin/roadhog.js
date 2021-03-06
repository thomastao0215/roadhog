#!/usr/bin/env node

const spawn = require('cross-spawn');
const script = process.argv[2];
const args = process.argv.slice(3);
const chalk = require('chalk');

const nodeVersion = process.versions.node;
const [major, minor] = nodeVersion.split('.');
if ((major * 10 + minor * 1) < 65) {
  console.log(`Node version not compatibile, ${chalk.cyan('must >= 6.5')}.`);
  process.exit(1);
}

let result;

switch (script) {
case '-v':
case '--version':
  console.log(require('../package.json').version);
  break;
case 'build':
case 'server':
case 'test':
  result = spawn.sync(
    'node',
    [require.resolve(`../scripts/${script}`)].concat(args),
    { stdio: 'inherit' }
  );
  process.exit(result.status);
  break;
default:
  console.log(`Unknown script ${chalk.cyan(script)}.`);
  break;
}
