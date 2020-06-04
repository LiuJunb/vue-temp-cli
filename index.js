#!/usr/bin/env node
var create = require('./lib/create')
var addCom = require('./lib/addCom')
var addPage = require('./lib/addPage')
var addStore = require('./lib/addStore')
var addService = require('./lib/addService')
var addPSS = require('./lib/addPSS')
var program = require('commander')

// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加 options 选项（可供后面定义的指令使用该选项，获取选项的属性 program.xxx ）
program
  .option('-d, --dir <dir>', '指定目录路劲,例如，src/views/main/。错误写法：/src/views/main/', './') // 获取 program.dir

// 3.添加create指令
program
  .command('create <project> [otherArg...]')
  .description('clone a repository into a newly created project or directory')
  .action(create.initProject);

// 5.添加 addCom 指令,例如：vue-temp-cli addCom xxx -d src/view/main/
program
  .command('addCom <name>')
  .description('add component, 例如：vue-temp-cli addCom xxx -d src/views/main/')
  .action((name)=>{
    // program.dir 是获取到option中的dir属性
    addCom.addCompoent(name, program.dir)
  })

// 6.添加 addPage 指令,例如：vue-temp-cli addPage xxx -d src/view/main/
program
.command('addPage <name>')
.description('add page component, 例如：vue-temp-cli addPage xxx -d src/views/main/')
.action((name)=>{
  addPage.addPageCompoent(name, program.dir)
})

// 7.添加 addStore  指令,例如：vue-temp-cli addStore index -d src/store/modules/login
// index 是固定的
program
.command('addStore <name>')
.description('add page store, 例如：vue-temp-cli addStore index -d src/store/modules/login')
.action((name)=>{
  addStore.addPageStore(name, program.dir)
})

// 8.添加 addService  指令,例如：vue-temp-cli addService index -d src/service/login
// index 是固定的
program
.command('addService <name>')
.description('add page service, 例如：vue-temp-cli addService index -d src/service/login')
.action((name)=>{
  addService.addPageService(name, program.dir)
})

// 9.添加 addPSS  指令,例如：vue-temp-cli addPSS xxx -d src/view/login/
program
.command('addPSS <name>')
.description('add page, store and service, 例如：vue-temp-cli addPSS xxx -d src/views/login/')
.action((name)=>{
  addPSS.addPSS(name, program.dir)
})

// 4.添加help提示信息
program.on('--help', function(){
  console.log('')
  console.log('Other:');
  console.log('  $ vue-temp-cli --help');
  console.log('  $ vue-temp-cli -h');
  console.log('  $ vue-temp-cli -v');
  console.log('  $ vue-temp-cli --version');
  console.log('  $ vue-temp-cli -d src/views/xx/xxx');

  console.log('  $ vue-temp-cli create myVue');
  console.log('  $ vue-temp-cli addPage xxx -d src/xx/xx');
  console.log('  $ vue-temp-cli addPSS xxx -d src/xx/xx');
  console.log('  $ vue-temp-cli addCom xxx -d src/xx/xx');
  console.log('  $ vue-temp-cli addService xxx -d src/service/xx');
  console.log('  $ vue-temp-cli addStore xxx -d src/store/modules/xx');
});
program.parse(process.argv);