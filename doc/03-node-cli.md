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

```js
const utils = require('./utils')

/**
 * 1.新建一个组件
 * @param {} name 组件的名称 hello-world  helloworld helloWorld HelloWorld  Helloworld
 * @param {*} dir 新建组件存放的目录（该路径不能以/开头）
 */
const addcompoent = async (name, dir)=>{
  // 1.获取模板需要的数据
  const data = utils.getTemplateData(name, dir)
  // 模板文件路径
  const templateFilePath = utils.resolveReallyPath('../template/src/components/hello-world.vue.ejs')
  // 生成目标文件的路劲
  const targetFilePath = utils.resolveRelativePath(`${dir}/${data.name}.vue`)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 3.编译成功，新建文件
  .then((str)=>{
    // 新建目录
    utils.mkdirsSync(dir)
    // 新建文件
    utils.generateFile(targetFilePath, str)
  })
  // console.log(name, dir)
  // console.log('utils=', utils.resolveReallyPath('../'))
  // console.log('utils=', utils.resolveRelativePath(dir))
}


module.exports = {
  addcompoent
}
```



3.安装模板引擎ejs

npm  install  ejs

```json
PS F:\blog\node-cli\vue-temp-cli> npm install ejs  

> ejs@3.1.3 postinstall F:\blog\node-cli\vue-temp-cli\node_modules\ejs
> node --harmony ./postinstall.js

Thank you for installing EJS: built with the Jake JavaScript build tool (https://jakejs.com/)

npm WARN vue-temp-cli@0.0.1 No description
npm WARN vue-temp-cli@0.0.1 No repository field.

+ ejs@3.1.3
added 10 packages from 5 contributors in 2.364s
PS F:\blog\node-cli\vue-temp-cli>
```



4.编写 utils.js 的工具类

```js
.....
.....

const path = require('path')
const fs = require('fs')
// 模板引擎
const ejs = require('ejs')
const nameUtils = require('./name-utils')

const log = (str)=>{
  console.log(chalk.green(str))
}
const errorLog = (str)=>{
  console.log(chalk.red(str))
}

// 1.打印欢迎界面
......

// 2.克隆模板项目(Download a git `repository` to a `destination` folder  with `options`  )
......

// 3.获取可以 执行终端命令的 子线程
.......

// 4.获取绝对路径（就是这个文件所在的路径），__dirname 总是指向被执行 js 文件的绝对路径
const resolveReallyPath = (...file) => path.resolve(__dirname, ...file)

// 5.获取相对路径（ ./ 是获取命令行执行命令时所在的路径）
const resolveRelativePath = (...file) => path.resolve('./', ...file)

/**
 * 6.模板的编译
 * @param {*} templateFilePath 模板文件的路劲
 * @param {*} data ejs模板数据, { }
 * @param {*} options ejs模板选项, { }
 */
const compiler = (templateFilePath, data={}, options={})=>{
  return new Promise((resolve,reject)=>{
    ejs.renderFile(templateFilePath, {data}, options, (err, str) => {
      if (!err) {
        // 编译成功
        resolve(str)
      } else {
        // 编译失败
        errorLog(err.message)
        reject(err)
      }
    })
  })
}

/**
 * 7.生成文件
 * @param {*} path 生成文件存放的路径
 * @param {*} data 文件的字符串内容
 */
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${args.dir}组件已存在`)
    // 退出程序
    process.exit(0)
  }
  return new Promise((resolve, reject) => {
    // 写文件到指定的文件下
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 8.获取ejs模板对应的数据
 * @param {*} name 
 */
const getTemplateData = (name,dirPath)=>{
  return {
    // dirPath :getDirPath(name), // 新建组件的路劲
    dirPath, // 新建组件的路劲 src/view/main/
    name :nameUtils.getComponentDirName(name), // 组件的名称（小写） demo1btn 或者  demo1btn 或者 demo1-btn
    humpName : nameUtils.getComponentName(name), // 组件的名称（首字母大写并驼峰命名） Demo1Btn
    firLowName : nameUtils.getComponentNameFirLow(name), // 组件的名称（首字母小写，其它字符首字符大写）demo1Btn
    routeLevel : nameUtils.getRouteLevel(name), // 组件路由的级别（1,2,3）
    parentRouteName : nameUtils.getParentRouteName(name), // 组件父亲路由的名称 main 、 ''  、
  }
}

/**
 * 9.递归新建目录（已存在不用管，不存在就新建）
 * @param {*} dirname  /src/view/main/
 */
function mkdirsSync(dirname) {
  // 存在,跳过
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (mkdirsSync(path.dirname(dirname))) {
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

module.exports = {
  .....
  .....  
  resolveReallyPath,
  resolveRelativePath,
  compiler,
  getTemplateData,
  generateFile,
  mkdirsSync
}
```



5.编写 name-utils.js工具类

```js

/**
 * 首字母 大写
 * @param {*} name  Name
 */
const upperCaseFirstName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/**
 * 首字母 小写
 * @param {*} name name
 */
const lowerCaseFirstName = (name) => {
  return name.charAt(0).toLowerCase() + name.slice(1)
}

/**
 * 获取组件文件夹的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return demo1btn 或者  demo/demo1btn 或者 demo/demo1-btn
 */
const getDirPath = (dirName) => {
  // 2.转成小写
  return dirName.toLowerCase()
}

/**
 * 获取组件文件夹的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return demo1btn 或者  demo1btn 或者 demo1-btn
 */
const getComponentDirName = (dirName) => {
  // 1.先分词
  const dirs = dirName.split('/')
  const componentDirName = dirs.pop()
  // 2.转成小写
  return componentDirName.toLowerCase()
}

/**
 * 获取组件的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // Demo1btn 或者  Demo1btn 或者 Demo1Btn
 */
const getComponentName = (componentName) => {
  // 1.先分词
  const names = componentName.split('/')
  let compName = names.pop()
  compName = compName.toLowerCase()
  const compNames = compName.split('-')
  for (let i = 0; i < compNames.length; i++) {
    compNames[i] = upperCaseFirstName(compNames[i])
  }
  const name = compNames.join('')
  return name
}

/**
 * 获取组件的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // demo1btn 或者  demo1btn 或者 demo1Btn
 */
const getComponentNameFirLow = (componentName) => {
  // 1.先分词
  const names = componentName.split('/')
  let compName = names.pop()
  compName = compName.toLowerCase()
  const compNames = compName.split('-')
  for (let i = 0; i < compNames.length; i++) {
    compNames[i] = upperCaseFirstName(compNames[i])
  }
  const name = compNames.join('')
  return lowerCaseFirstName(name)
}

/**
 * 获取是一级路由，还是二级路由，还是三级路由
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // 1 或者  1 或者  2
 */
const getRouteLevel = (dirName) => {
  // 1.先分词
  const names = dirName.split('/')
  return names.length
}

/**
 * 获取父亲路由名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // '' 或者  demo 或者  demo
 */
const getParentRouteName = (dirName) => {
  // 1.先分词
  const names = dirName.split('/')
  let result = ''
  if (names.length > 1) {
    result = names[names.length - 2] // 倒数第二个
  }
  return result
}

// console.log(getParentRouteName('demo1btn'))
// console.log(getParentRouteName('demo/demo1btn'))
// console.log(getParentRouteName('demo/demo1-btn'))
// console.log(getParentRouteName('demo/Demo1-Btn'))
// console.log(getParentRouteName('demo/Demo1-btn/sd'))

module.exports = {
  getDirPath,
  getComponentName,
  getComponentDirName,
  getComponentNameFirLow,
  getRouteLevel,
  getParentRouteName,

  upperCaseFirstName,
  lowerCaseFirstName
}

```



2.执行 `vue-temp-cli addcom hellow-World -d src/components` 命令，就会在执行该命令的路劲下：新建`src/components/`这个目录，然后在该目录下新建`hellow-World.vue`文件。

```json

# 在执行指令目录下下面一个`hellow-World.vue`文件
vue-temp-cli addcom hellow-World 

# 在执行指令目录下新建src/components/文件夹，然后在该文件夹下面新建一个`hellow-World.vue`文件
vue-temp-cli addcom hellow-World -d src/components/
vue-temp-cli addcom hellow-World -d src/components

# 下面两种是错误的写法
vue-temp-cli addcom hellow-World -d  /src/components
vue-temp-cli addcom hellow-World -d  /src/components/

```









