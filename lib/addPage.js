const utils = require('./utils')
/**
 * 新建一个页面组件的指令
 * @param {*} name 
 * @param {*} dir 
 */
const addPageCompoent = (name, dir)=>{
  // 1.自动生成.vue文件
  addPageVue(name, dir)
  // 2.自动生成route.js文件
  addPageRoute(name, dir)
  // 3.自动生成page-config配置文件
  addPageConfig(name, dir)
}

const addPageVue = (name, dir)=>{
    // 1.获取模板需要的数据
    const data = utils.getTemplateData(name, dir)
    const templateFilePath = utils.resolveReallyPath('../template/src/views/login/login.vue.ejs')
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
    const templateFilePath = utils.resolveReallyPath('../template/src/views/login/route.js.ejs')
    const targetFilePath = utils.resolveRelativePath(`${dir}/route.js`)
    // 2.开始编译模板（模板文件，数据）
    utils.compiler(templateFilePath, data)
    // 3.编译成功后新建文件
    .then((str)=>{
      utils.mkdirsSync(dir)
      utils.generateFile(targetFilePath, str)
    })
}
const addPageConfig = (name, dir)=>{
    // 1.获取模板需要的数据
    const data = utils.getTemplateData(name, dir)
    const templateFilePath = utils.resolveReallyPath('../template/src/views/login/page-config/index.js.ejs')
    const targetFilePath = utils.resolveRelativePath(`${dir}/page-config/index.js`)
    // 2.开始编译模板（模板文件，数据）
    utils.compiler(templateFilePath, data)
    // 3.编译成功后新建文件
    .then((str)=>{
      utils.mkdirsSync(dir+'/page-config')
      utils.generateFile(targetFilePath, str)
    })
}
module.exports = {
  addPageCompoent
}