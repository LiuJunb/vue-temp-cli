# node编写cli命令行(三)

该文章是在 `node编写cli命令行(二)` 的基础上继续编写的

## 1.编写 addcom 指令

编写一个 addcom 指令，例如当执行：`vue-temp-cli addcom HelloWorld -d /src/view/main`  时，会在`/src/view/main`目录下新建一个组件

### 1.编写简单的 addcom 指令

1.修改index.js文件

添加新建项目的 addcom 指令

```json
#!/usr/bin/env node
var create = require('./lib/create')
// 导入addcom.js文件
var addcom = require('./lib/addcom')
var program = require('commander');

// 1.添加版本
program.version(require('./package.json').version,  '-v, --version')

// 2.添加 options 选项（可供后面定义的指令使用该选项，获取选项的属性 program.xxx ）
program
  .option('-d, --dir <dir>', '指定目录路劲,例如，src/view/main/。错误：/src/view/main/', './') // 获取 program.dir

// 3.添加create指令
.....

// 5.添加 addcom 指令,例如：vue-temp-cli addcom Xxx -d src/view/main/
program
  .command('addcom <name>')
  .description('add component, 例如：vue-temp-cli addcom XXX -d src/view/main/')
  .action((name)=>{
    addcom.addcompoent(name, program.dir)
  })

// 4.添加help提示信息
.....
program.parse(process.argv);
```



2.编写 addcom.js 文件

```

```



3.安装模板引擎ejs





2.执行 `vue-temp-cli create myVue a b` 命令

```json
PS F:\blog\node-cli\vue-temp-cli> vue-temp-cli create myVue a b
vue-temp-cli
vue-temp-cli myVue a b
PS F:\blog\node-cli\vue-temp-cli>
```









