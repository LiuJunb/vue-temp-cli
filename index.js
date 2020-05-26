#!/usr/bin/env node
var create = require('./lib/create')
var addcom = require('./lib/addcom')
var addPage = require('./lib/addPage')
var program = require('commander')

// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加 options 选项（可供后面定义的指令使用该选项，获取选项的属性 program.xxx ）
program
  .option('-d, --dir <dir>', '指定目录路劲,例如，src/view/main/。错误：/src/view/main/', './') // 获取 program.dir

// 3.添加create指令
program
  .command('create <project> [otherArg...]')
  .description('clone a repository into a newly created project or directory')
  .action(create.initProject);

// 5.添加 addcom 指令,例如：vue-temp-cli addcom Xxx -d src/view/main/
program
  .command('addcom <name>')
  .description('add component, 例如：vue-temp-cli addcom XXX -d src/view/main/')
  .action((name)=>{
    // program.dir 是获取到option中的dir属性
    addcom.addcompoent(name, program.dir)
  })

// 6.添加 addPage 指令,例如：vue-temp-cli addPage Xxx -d src/view/main/
program
.command('addPage <name>')
.description('add page component, 例如：vue-temp-cli addPage XXX -d src/view/main/')
.action((name)=>{
  addPage.addPageCompoent(name, program.dir)
})

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