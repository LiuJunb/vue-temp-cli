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
  await utils.cloneProject(
    'direct:http://172.16.120.120/25759/vue-pro-temp.git#admin-app',
    projectName,
    { clone: true }
  )

  // 3.安装依赖
  // 进度条
  const ora = require('ora')
  const pro = ora(`🚀🚀npm install 安装依赖...`)
  pro.start()
  // 这个种写法在window电脑下回报错
  // await utils.terminal('npm', ['install'], {cwd: `./${projectName}`})
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await utils.terminal(npm, ['install'], {cwd: `./${projectName}`})
  // 关闭进度条
  pro.succeed()
  utils.log(`🚀🚀finish 依赖安装完毕...`)
  // 4.打开浏览器
  open('http://localhost:8080')  
  // 5.运行项目
  await utils.terminal(npm, ['run', 'serve'], {cwd: `./${projectName}`})

  // vue-temp-cli create myVue a b
  // console.log('vue-temp-cli', project, otherArg.join(' '));

  // https://github.com/LiuJunb/testweb  public ok
  // await utils.cloneProject('github:LiuJunb/testweb', project)
  
  // need add {clone:true}
  // await utils.cloneProject('direct:https://github.com/LiuJunb/testweb.git', project,{ clone: true })

  // 不能使用ip
  // await utils.cloneProject('gitlab:172.16.120.120:25759/vue-pro-temp', project)
  // ok
  // await utils.cloneProject('direct:http://172.16.120.120/25759/vue-pro-temp.git#admin-app', project, { clone: true })
}
module.exports = {
  initProject
}