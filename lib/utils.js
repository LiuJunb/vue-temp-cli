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

module.exports = {
  printWelcome,
  cloneProject,
  log,
  terminal
}