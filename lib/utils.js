// Node8 就提供了 util.promisify() 这个方法，方便我们快捷的把原来的异步回调方法改成返回 Promise 实例的方法
const { promisify } = require('util')
// figlet 工具可以将 message 转化为空心的字体
const figlet = promisify(require('figlet'))
// clear 清空终端的屏幕
const clear = require('clear')
// chalk是一个颜色的插件，可以修改终端字体颜色
const chalk = require('chalk')

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
const printWelcome = async (str)=>{
  clear()
  const welcome = await figlet(str)
  log(welcome)
}

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

/**
 * 3.获取可以 执行终端命令的 子线程
 * @param  {...any} args  ['npm', ['install'], {cwd:'./myVue'}]
 * 参数说明：命令   参数   执行的目录
 *         ['npm', ['install'], {cwd:'./myVue'}]
 *		     ['npm', ['run', 'serve'], {cwd:'./myVue'}]
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
    errorLog(`该组件已存在`)
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
        log(`🚀组件新建成功`)
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
  printWelcome,
  cloneProject,
  log,
  terminal,
  resolveReallyPath,
  resolveRelativePath,
  compiler,
  getTemplateData,
  generateFile,
  mkdirsSync
}