# node编写cli命令行(一)

前端日常开发中，会遇见各种各样的cli，比如一行命令帮你打包的 `webpack`，一行命令帮你生成vue项目模板的`vue-cli`，还有创建react项目的`create-react-app`等等。那么这些脚手架是什么编写的？下面演示一下如何制作一个`vue-temp-cli` 脚手架。

## 1.先编写node脚本

1.新建一个vue-temp-cli 文件夹

```json
`-- vue-temp-cli
    |-- index.js
    `-- lib
```

2.在改文件夹下新建一个index.js 文件,内容如下

```js
console.log('vue-temp-cli')
```

3.执行该node脚本

```json
PS F:\blog\node-cli\vue-temp-cli> node .\index.js
vue-temp-cli
PS F:\blog\node-cli\vue-temp-cli> 
```

完成上面的步骤，只是编写了简单的node脚本，这时的 vue-temp-cli 脚本并不能像vue-cli，webpack直接在终端中使用，只能使用 node ./index.js 来执行。 那怎样才能使 vue-temp-cli 脚本能像vue-cli在终端使用呢？下面开始制作。

## 2.脚本制作cli命令行

1.新建一个package.json 文件

```
PS F:\blog\node-cli\vue-temp-cli> npm init -y
```



2.添加package.json的bin字段

```json
{
  "name": "vue-temp-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin":{
    "vue-temp-cli":"index.js"
  },
  "directories": {
    "lib": "lib"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

> "bin":{
>     "脚手架的名称":"脚手架执行的入口文件"
>   }

3.index.js文件顶部声明执行环境：

```json
#!/usr/bin/env node
console.log('vue-temp-cli')
```



添加 `#!/usr/bin/env node` 或者 `#!/usr/bin/node` ，这是告诉系统，下面这个脚本，使用nodejs来执行。

`#!/usr/bin/env node` 的意思是让系统自己去找node的执行程序。

`#!/usr/bin/node` 的意思是，明确告诉系统，node的执行程序在路径为 `/usr/bin/node` 。



4.执行 `npm link` 

```json
PS F:\blog\node-cli\vue-temp-cli> npm link
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.

up to date in 0.445s
# 生成的vue-temp-cli可执行文件存到 C:\Users\liujun\AppData\Roaming\npm 目录下
C:\Users\liujun\AppData\Roaming\npm\vue-temp-cli -> C:\Users\liujun\AppData\Roaming\npm\node_modules\vue-temp-cli\index.js
C:\Users\liujun\AppData\Roaming\npm\node_modules\vue-temp-cli -> F:\blog\node-cli\vue-temp-cli
PS F:\blog\node-cli\vue-temp-cli>  
```

在当前package.json目录下，打开命令行工具，执行 `npm link` ，将当前的代码在npm全局目录下留个快捷方式。相当于全局安装了vue-temp-cli这个脚手架了



5.在终端执行 vue-teml-cli 命令，执行index.js中的脚本

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli
vue-temp-cli
```

这些一个简单的node cli命令行工具编写完成，但是现在还不能执行 `vue-temp-cli -v`  , `vue-temp-cli create` 等指令，下面开始编写命令行工具的指令。



## 3.编写查看版本-v指令

1.安装 commander 库

[Commander.js](https://github.com/tj/commander.js) node.js 命令行界面的完整解决方案

```json
PS F:\blog\node-cli\vue-temp-cli> npm install commander
npm WARN vue-temp-cli@1.0.0 No description
npm WARN vue-temp-cli@1.0.0 No repository field.

+ commander@5.1.0
added 1 package from 1 contributor in 0.699s
```

2.编写index.js 文件

```json
#!/usr/bin/env node
console.log('vue-temp-cli')
var program = require('commander');
program.version(require('./package.json').version)
program.parse(process.argv);
```



3.保存上面代码后执行 `vue-temp-cli  -V` 命令 （ 不需要 npm link ）

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli -V
vue-temp-cli
1.0.0
PS F:\blog\node-cli\vue-temp-cli> 
```

控制台成功的打印了 vue-temp-cli  的版本号，当执行 `vue-temp-cli -v` 时，发现并没有效果。那如果希望程序响应-v选项而不是-V选项，那怎么办呢？看下面代码



4.添加 `-v  --version` 指令 替换 `-V`

```json
#!/usr/bin/env node
console.log('vue-temp-cli')
var program = require('commander');
# 注意字符串语法：'-v, --version'，分为长短标识，中间用逗号、竖线或者空格分割。只能有长短标识
program.version(require('./package.json').version,  '-v, --version')
program.parse(process.argv);
```



5.执行 `vue-temp-cli  -v` 等命令

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli -v       
vue-temp-cli
1.0.0
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli --version
vue-temp-cli
1.0.0
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli -V       
vue-temp-cli
error: unknown option '-V'
PS F:\blog\node-cli\vue-temp-cli> 
```



## 4.编写-h指令的提示信息

1.执行 `vue-temp-cli  -h` 命令

下面是默认的提示信息

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli -h
vue-temp-cli
Usage: index [options]

Options:
  -v, --version  output the version number
  -h, --help     display help for command
PS F:\blog\node-cli\vue-temp-cli>
```



2.添加两个 options 提示显示

```json
#!/usr/bin/env node
console.log('vue-temp-cli')
var program = require('commander');
program.version(require('./package.json').version,  '-v, --version')

program.option('create <project>', '新建一个项目，例如：vue-temp-cli create myVue')
program.option('-i, --integer <n>', 'An integer argument')

program.parse(process.argv);
```



3.执行 `vue-temp-cli  -h` 命令

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli -h  
vue-temp-cli
Usage: index [options]

Options:
  -v, --version      output the version number
  create <project>   新建一个项目，例如：vue-temp-cli create myVue
  -i, --integer <n>  An integer argument
  -h, --help         display help for command
PS F:\blog\node-cli\vue-temp-cli>
```



4.添加other 提示

```json
#!/usr/bin/env node
console.log('vue-temp-cli')
var program = require('commander');
program.version(require('./package.json').version,  '-v, --version')

program.option('create <project>', '新建一个项目')
program.option('-i, --integer <n>', 'An integer argument')

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



5.执行 `vue-temp-cli  -h` 命令

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli -h
vue-temp-cli
Usage: index [options]

Options:
  -v, --version      output the version number
  create <project>   新建一个项目
  -i, --integer <n>  An integer argument
  -h, --help         display help for command

Other:
  $ vue-temp-cli --help
  $ vue-temp-cli -h
  $ vue-temp-cli -v
  $ vue-temp-cli --version
  $ vue-temp-cli -i 1
  $ vue-temp-cli --interger 1
  $ vue-temp-cli create myVue
PS F:\blog\node-cli\vue-temp-cli>
```













