
// 1.打印欢迎界面的字体
const welcomeString = 'HYZS WEB CLI'
// 2.克隆项目git地址 和 指定的分支
const cloneProject = 'http://172.16.120.120/25759/vue-pro-temp.git'
// 3.指定项目的分支（ cloneProject + projectBranch ）
const projectBranch = '#admin-app-system'
// 4.启动服务的ip 和 端口
const openServce = 'http://localhost:8080' 



module.exports = {
  welcomeString,
  cloneProject,
  openServce,
  projectBranch
}