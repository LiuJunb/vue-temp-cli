
const utils = require('./utils')
var addPage = require('./addPage')
var addStore = require('./addStore')
var addService = require('./addService')

/**
 * 新建一个页面对应的 page, store and service 的指令
 * @param {} name 组件的名称 hello-world  helloworld helloWorld HelloWorld  Helloworld
 * @param {*} dir 新建组件存放的目录（该路径不能以/开头）
 */
const addPSS =  (name, dir)=>{
  let pre = 'src/views/'
  if(dir && dir.indexOf(pre) !== -1 ){
    dir = dir.split('src/views/').pop()
  }
  // 1.新建page
  addPage.addPageCompoent(name, 'src/views/' + dir) // vue-temp-cli addPage login -d src/views/login
  // 2.新建store
  addStore.addPageStore(name,'src/store/modules/' + dir) // vue-temp-cli addStore login -d src/store/modules/login
  // 3.新建service
  addService.addPageService(name, 'src/service/' + dir) // vue-temp-cli addService login -d src/service/login
}

module.exports = {
  addPSS
}