const utils = require('./utils')
/**
 * 新建一个页面组件的指令
 * @param {*} name 
 * @param {*} dir 
 */
const addPageCompoent = (name, dir)=>{
  // 自动生成.vue文件
  addPageVue(name, dir)
  // 自动生成route.js文件
  addPageRoute(name, dir)
}

const addPageVue = (name, dir)=>{
    // 1.获取模板需要的数据
    const data = utils.getTemplateData(name, dir)
    const templateFilePath = utils.resolveReallyPath('../template/src/view/login/login.vue.ejs')
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
    const templateFilePath = utils.resolveReallyPath('../template/src/view/login/route.js.ejs')
    const targetFilePath = utils.resolveRelativePath(`${dir}/route.js`)
    // 2.开始编译模板（模板文件，数据）
    utils.compiler(templateFilePath, data)
    // 3.编译成功后新建文件
    .then((str)=>{
      utils.mkdirsSync(dir)
      utils.generateFile(targetFilePath, str)
    })
}
module.exports = {
  addPageCompoent
}