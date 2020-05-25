#!/usr/bin/env node
var create = require('./lib/create')
var program = require('commander');
// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加options提示信息
program
  .option('create <project>', '新建一个项目')
  .option('-i, --integer <n>', 'An integer argument')

// 3.添加create指令
program
  .command('create <project> [otherArg...]')
  .action(create.initProject);
  
// 4.添加help提示信息
program.on('--help', function(){
  console.log('')
  console.log('Other:');
  console.log('  $ vue-temp-cli --help');
  console.log('  $ vue-temp-cli -h');
  console.log('  $ vue-temp-cli -v');
  console.log('  $ vue-temp-cli --version');
  console.log('  $ vue-temp-cli -i 1');
  console.log('  $ vue-temp-cli --interger 1');
  console.log('  $ vue-temp-cli create myVue');
});
program.parse(process.argv);