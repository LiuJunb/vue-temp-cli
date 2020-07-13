
const utils = require('./utils')
var addPage = require('./addPage')
var addStore = require('./addStore')
var addService = require('./addService')

/**
 * 新建一个页面对应的 首页统计 page, store and service 的指令
 * @param {} name 组件的名称 hello-world  helloworld helloWorld HelloWorld  Helloworld
 * @param {*} dir 新建组件存放的目录（该路径不能以/开头）
 */
const addHomePSS =  (name, dir)=>{
  // vue-temp-cli addHomePSS example -d src/views/main/example
  let pre = 'src/views/'
  if(dir && dir.indexOf(pre) !== -1 ){
    dir = dir.split('src/views/').pop() // main/example
  }
  // 1.新建 首页统计 page
  addTablePageCom(name, 'src/views/'+dir) 
  // 2.新建store
  addStore.addPageStore(name,'src/store/modules/' + dir) // vue-temp-cli addStore login -d src/store/modules/login
  // 3.新建service
  addService.addPageService(name, 'src/service/' + dir) // vue-temp-cli addService login -d src/service/login
}

const addTablePageCom = (name, dir)=>{
  // 1.自动生成.vue文件
  addPageVue(name, dir)
  // 2.自动生成route.js文件
  addPageRoute(name, dir)
  // 3.自动生成page-config配置文件
  addPageConfig(name, dir, 'index')
  addPageConfig(name, dir, 'ad-search-config')
  addPageConfig(name, dir, 'echarts-config')
}

const addPageVue = (name, dir)=>{
  // 1.获取模板需要的数据
  const data = utils.getTemplateData(name, dir)
  const templateFilePath = utils.resolveReallyPath('../template/src/views/main/statistical/statistical.vue.ejs')
  const targetFilePath = utils.resolveRelativePath(`${dir}/${data.name}.vue`)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 3.编译成功后新建文件
  .then((str)=>{
    utils.mkdirsSync(dir)
    utils.generateFile(targetFilePath, str)
  })
}

const addPageRoute = (name, dir)=>{
  // 1.获取模板需要的数据
  const data = utils.getTemplateData(name, dir)
  const templateFilePath = utils.resolveReallyPath('../template/src/views/main/statistical/route.js.ejs')
  const targetFilePath = utils.resolveRelativePath(`${dir}/route.js`)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 3.编译成功后新建文件
  .then((str)=>{
    utils.mkdirsSync(dir)
    utils.generateFile(targetFilePath, str)
  })
}
const addPageConfig = (name, dir, config_file_name)=>{
  // 1.获取模板需要的数据
  const data = utils.getTemplateData(name, dir)
  const templateFilePath = utils.resolveReallyPath(`../template/src/views/main/statistical/page-config/${config_file_name}.js`)
  const targetFilePath = utils.resolveRelativePath(`${dir}/page-config/${config_file_name}.js`)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 3.编译成功后新建文件
  .then((str)=>{
    utils.mkdirsSync(dir+'/page-config')
    utils.generateFile(targetFilePath, str)
  })
}

module.exports = {
  addHomePSS
}