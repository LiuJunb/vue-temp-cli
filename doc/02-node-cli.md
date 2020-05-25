# node编写cli命令行(二)

该文章是在 `node编写cli命令行(一)` 的基础上继续编写的

## 1.编写 create 指令

编写一个新建vue项目的 create 指令，例如当执行：`vue-temp-cli create myVue`  时，会新建一个项目名称为myVue 的 Vue 项目

### 1.编写简单的 create 指令

1.修改index.js文件

添加新建项目的 create 指令

```json
#!/usr/bin/env node
console.log('vue-temp-cli')
var program = require('commander');
// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加 options 选项（可供后面定义的指令使用该选项，获取选项的属性 program.xxx ）
program
  .option('-i, --integer <n>', 'An integer argument')

// 3.添加新建项目的 create 指令。例如：vue-temp-cli create xxx
program
  .command('create <project> [otherArg...]')
  .description('clone a repository into a newly created project or directory')
  .action(function (project, otherArg) {
    // vue-temp-cli create myVue a b
    console.log('vue-temp-cli', project, otherArg.join(' '));
  });
  
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
```



2.执行 `vue-temp-cli create myVue a b` 命令

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli create myVue a b
vue-temp-cli
vue-temp-cli myVue a b
PS F:\blog\node-cli\vue-temp-cli>
```

### 2.美化欢迎界面

1.安装 figlet ,  clear 和 

figlet 工具可以将 message 转化为空心的字体

clear 清空终端的屏幕

chalk是一个颜色的插件，可以修改终端字体颜色

```json
PS F:\blog\node-cli\vue-temp-cli> npm install figlet
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.
+ figlet@1.4.0
added 1 package from 1 contributor in 1.276s

PS F:\blog\node-cli\vue-temp-cli> npm install clear        
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.
+ clear@0.1.0
added 1 package from 1 contributor in 0.848s

PS F:\blog\node-cli\vue-temp-cli> npm install chalk
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.
+ chalk@4.0.0
added 7 packages from 4 contributors in 1.257s
PS F:\blog\node-cli\vue-temp-cli> 
```



2.在lib文件夹下新建 utils.js 文件

新建 utils.js

````json
`-- vue-temp-cli
    |-- lib
        |-- utils.js
    `-- index.js
````

utils.js 文件内容如下

```js
// Node8 就提供了 util.promisify() 这个方法，方便我们快捷的把原来的异步回调方法改成返回 Promise 实例的方法
const { promisify } = require('util')
// figlet 工具可以将 message 转化为空心的字体
const figlet = promisify(require('figlet'))
// clear 清空终端的屏幕
const clear = require('clear')

// 打印欢迎界面
const printWelcome = async (str)=>{
  clear()
  const welcome = await figlet(str)
  console.log(welcome)
}


module.exports = {
  printWelcome
}
```



3.在index.js文件引入 utils.js文件

```json
#!/usr/bin/env node

const utils = require('./lib/utils')
var program = require('commander');
utils.printWelcome('welcome  CLI')
// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加options
....
// 3.添加create指令
program
  .command('create <project> [otherArg...]')
  .action(function (project, otherArg) {
    // vue-temp-cli create myVue a b
    // console.log('vue-temp-cli', project, otherArg.join(' '));
  });
  
// 4.添加help提示信息
....
program.parse(process.argv);
```



4.执行 `vue-temp-cli create myVue` 命令

```
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli create myVue
               _                              ____ _     ___
 __      _____| | ___ ___  _ __ ___   ___    / ___| |   |_ _|
 \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \  | |   | |    | |
  \ V  V /  __/ | (_| (_) | | | | | |  __/  | |___| |___ | |
   \_/\_/ \___|_|\___\___/|_| |_| |_|\___|   \____|_____|___|

PS F:\blog\node-cli\vue-temp-cli>

```

5.修改字体颜色

直接修改utils.js文件，添加一个log函数，打印绿色的字体

修改完后重新执行 `vue-temp-cli create myVue` 命令，终端控制台就会打印 绿色的欢迎界面的字体 

```js
// Node8 就提供了 util.promisify() 这个方法，方便我们快捷的把原来的异步回调方法改成返回 Promise 实例的方法
const { promisify } = require('util')
// figlet 工具可以将 message 转化为空心的字体
const figlet = promisify(require('figlet'))
// clear 清空终端的屏幕
const clear = require('clear')
// chalk是一个颜色的插件，可以修改终端字体颜色
const chalk = require('chalk')

// 输出绿色字体
const log = (str)=>{
  console.log(chalk.green(str))
}

// 打印欢迎界面
const printWelcome = async (str)=>{
  clear()
  const welcome = await figlet(str)
  // 输出绿色字体
  log(welcome)
}


module.exports = {
  printWelcome
}
```

### 3.克隆模板项目

1.安装 download-git-repo ,  ora 库

`download-git-repo` 用来 clone  `Github  GitLab`仓库项目的node库

`ora`  一个优雅的 Node.js 终端加载动画效果

```json
PS F:\blog\node-cli\vue-temp-cli> npm install download-git-repo
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.
+ download-git-repo@3.0.2
added 124 packages from 46 contributors in 11.594s


PS F:\blog\node-cli\vue-temp-cli> npm install ora
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.
+ ora@4.0.4
added 22 packages from 25 contributors in 2.494s
PS F:\blog\node-cli\vue-temp-cli>
```



2.在utils.js中编写`克隆模板项目`的代码

```js
// Node8 就提供了 util.promisify() 这个方法，方便我们快捷的把原来的异步回调方法改成返回 Promise 实例的方法
const { promisify } = require('util')
// figlet 工具可以将 message 转化为空心的字体
const figlet = promisify(require('figlet'))
// clear 清空终端的屏幕
const clear = require('clear')
// chalk是一个颜色的插件，可以修改终端字体颜色
const chalk = require('chalk')

const log = (str)=>{
  console.log(chalk.green(str))
}

// 1.打印欢迎界面
......

// 2.克隆模板项目(Download a git `repository` to a `destination` folder  with `options`  )
const cloneProject = async (repository, destination, options)=>{
  const download = promisify(require('download-git-repo'))
  // 进度条
  const ora = require('ora')
  const process = ora(`git clone ${repository} .....`)
  process.start()
  // clone
  await download(repository, destination, options ? options : { clone: false })
  // 关闭进度条
  process.succeed()
}

module.exports = {
  printWelcome,
  cloneProject,
  log
}
```



3.在lib文件夹新建create.js文件

```json
`-- vue-temp-cli
    |-- lib
        |-- create.js
        |-- utils.js
    `-- index.js
```

create.js文件对应的内容

```json
const utils = require('./utils')
/**
 * 初始化项目
 * @param {*} projectName  新建项目的名称
 * @param {*} otherArg  其它参数
 */
const initProject =async (projectName, otherArg)=>{
  // 1.欢迎界面
  await utils.printWelcome('HYZS WEB CLI')
  console.log(`🚀新建项目:${projectName}`)
  // 2.克隆模板
  await utils.cloneProject('direct:http://12.16.120.120/25759/vue-pro-temp.git#admin-app', projectName, { clone: true })

  // 3.自动安装依赖

  // 4.自动打开浏览器

  // 5.自动运行项目
   

  // https://github.com/LiuJunb/testweb  public ok
  // await utils.cloneProject('github:LiuJunb/testweb', project)
  
  // need add {clone:true}
  // await utils.cloneProject('direct:https://github.com/LiuJunb/testweb.git', project,{ clone: true })

  // 不能使用ip
  // await utils.cloneProject('gitlab:12.16.120.120:25759/vue-pro-temp', project)
    
  // ok
  // await utils.cloneProject('direct:http://12.16.120.120/25759/vue-pro-temp.git#admin-app', project, { clone: true })
    
}
module.exports = {
  initProject
}
```

> 注意：该测试案例的github仓库地址是public



5.在index.js文件中调用create.js中初始化项目的函数

var create = require('./lib/create')

create.initProject

```js
#!/usr/bin/env node
var create = require('./lib/create')
var program = require('commander');
// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加options
....
// 3.添加create指令
program
  .command('create <project> [otherArg...]')
  .action(create.initProject);
  
// 4.添加help提示信息
....
program.parse(process.argv);
```



6.打开任意终端执行 `vue-temp-cli  create myVue` 命令

```
PS F:\blog\node-cli>vue-temp-cli  create myVue
               _                              ____ _     ___ 
 __      _____| | ___ ___  _ __ ___   ___    / ___| |   |_ _|
 \ \ /\ / / _ \ |/ __/ _ \| '_ ` _ \ / _ \  | |   | |    | | 
  \ V  V /  __/ | (_| (_) | | | | | |  __/  | |___| |___ | | 
   \_/\_/ \___|_|\___\___/|_| |_| |_|\___|   \____|_____|___|

��新建项目目:myVue
√ git clone direct:http://12.16.120.120/25759/vue-pro-temp.git#admin-app .....
PS F:\blog\node-cli>
```

> 执行完之后，会在执行该命令的目录下新建一个 myVue 项目，并 把远程仓库的代码clone下来了



### 4.自动安装依赖

1.在utils.js中编写执行终端命令的子线程

```js
// Node8 就提供了 util.promisify() 这个方法，方便我们快捷的把原来的异步回调方法改成返回 Promise 实例的方法
const { promisify } = require('util')
// figlet 工具可以将 message 转化为空心的字体
const figlet = promisify(require('figlet'))
// clear 清空终端的屏幕
const clear = require('clear')
// chalk是一个颜色的插件，可以修改终端字体颜色
const chalk = require('chalk')

const log = (str)=>{
  console.log(chalk.green(str))
}

// 1.打印欢迎界面
.....

// 2.克隆模板项目(Download a git `repository` to a `destination` folder  with `options`  )
......

/**
 * 4.获取可以 执行终端命令的 子线程
 * @param  {...any} args  ['npm', ['install'], {cwd:'./myVue'}]
 * 参数说明：命令   参数   执行的目录
 *      ['npm', ['install'], {cwd:'./myVue'}]
 *		['npm', ['run', 'serve'], {cwd:'./myVue'}]
 */
const terminal = async (...args) =>{
  const {spawn} = require('child_process')
  return new Promise((resolve)=>{
    // 子线程
    const proc = spawn(...args)
    // console.log('proc=',proc)
    // 子线程 proc --终端的输出转到--> 主线程 process
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', ()=>{
      resolve()
    })
  })
}

module.exports = {
  printWelcome,
  cloneProject,
  log,
  terminal
}
```



2.在create.js中调用 terminal 函数来执行终端命令

```js
const utils = require('./utils')

/**
 * 初始化项目
 * @param {*} projectName  新建项目的名称
 * @param {*} otherArg  其它参数
 */
const initProject =async (projectName, otherArg)=>{
  // 1.欢迎界面
  await utils.printWelcome('HYZS WEB CLI')
  console.log(`🚀🚀新建项目:${projectName}`)
  // 2.克隆模板
  // await utils.cloneProject(
  //   'direct:http://172.16.120.120/25759/vue-pro-temp.git#admin-app',
  //   projectName,
  //   { clone: true }
  // )

  // 3.安装依赖
  utils.log(
`🚀🚀npm install  安装依赖...`
  )
  // 这个种写法在window电脑下回报错
  // await utils.terminal('npm', ['install'], {cwd: `./${projectName}`})
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await utils.terminal(npm, ['install'], {cwd: `./${projectName}`})
  utils.log(
`🚀🚀依赖安装完毕...`
  )
  // 4.打开浏览器

  // 5.运行项目
}
module.exports = {
  initProject
}
```

3.执行 `vue-temp-cli create myVue` 

执行该指令之后，就会给新建的项目自动执行 `npm install`

> 相当于执行了： cd myVue  &&  npm install

### 5.自动打开浏览器

1.安装 open 依赖 

open  库可以自动打开浏览器

```json
PS F:\blog\node-cli\vue-temp-cli> npm install open
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.

+ open@7.0.4
added 3 packages from 1 contributor in 1.835s
```



2.编写代码

```js
const utils = require('./utils')
const open = require('open')
/**
 * 初始化项目
 * @param {*} projectName  新建项目的名称
 * @param {*} otherArg  其它参数
 */
const initProject =async (projectName, otherArg)=>{
  // 1.欢迎界面
  await utils.printWelcome('HYZS WEB CLI')
  utils.log(`🚀🚀New Vue Project Name:${projectName}`)
  // 2.克隆模板
  ....

  // 3.安装依赖
  ....
  // 4.打开浏览器
  open('http://localhost:8080')  
  // 5.运行项目

}
module.exports = {
  initProject
}
```



3.测试

执行 `vue-temp-cli create myVue`  后会自动打开浏览器



### 6.自动运行项目

1.编写create.js

添加 自动运行项目 代码

```js
const utils = require('./utils')
const open = require('open')
/**
 * 初始化项目
 * @param {*} projectName  新建项目的名称
 * @param {*} otherArg  其它参数
 */
const initProject =async (projectName, otherArg)=>{
  // 1.欢迎界面
  await utils.printWelcome('HYZS WEB CLI')
  utils.log(`🚀🚀New Vue Project Name:${projectName}`)
    
  // 2.克隆模板
  .....	
  
  // 3.安装依赖
  utils.log(`🚀🚀npm install 安装依赖...`)
  // 进度条
  const ora = require('ora')
  const pro = ora(`git clone ${repository} .....`)
  pro.start()
  // 这个种写法在window电脑下回报错
  // await utils.terminal('npm', ['install'], {cwd: `./${projectName}`})
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await utils.terminal(npm, ['install'], {cwd: `./${projectName}`})
  // 关闭进度条
  pro.succeed()
  utils.log(`🚀🚀finish 依赖安装完毕...`)
    
  // 4.自动打开浏览器
  open('http://localhost:8080')  
    
  // 5.自动运行项目
  await utils.terminal(npm, ['run', 'serve'], {cwd: `./${projectName}`})
    
}
module.exports = {
  initProject
}
```

> 相当于执行：cd myVue &&  npm run serve

2.测试

执行 `vue-temp-cli create myVue`  后会自动运行项目



## 2.发布vue-temp-cli到npm

```json
npm config set registry http://registry.npmjs.org
npm login
npm publish
```











