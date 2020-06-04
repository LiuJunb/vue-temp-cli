
const utils = require('./utils')

/**
 * 新建一个页面对应的store的指令
 * @param {} name 组件的名称 hello-world  helloworld helloWorld HelloWorld  Helloworld
 * @param {*} dir 新建组件存放的目录（该路径不能以/开头）
 */
const addPageStore =  (name, dir)=>{
  addStore(name, dir)
  addTypes(name, dir)
}


const addStore = (name, dir)=>{
  // 1.获取模板需要的数据
  const data = utils.getTemplateData(name, dir)
  // 模板文件路径
  const templateFilePath = utils.resolveReallyPath('../template/src/store/modules/login/index.js.ejs')
  // 生成目标文件的路劲( RelativePath + src/store/modules/xxx/xxx )
  const targetFilePath = utils.resolveRelativePath(`${dir}/index.js`)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 编译成功
  .then((str)=>{
    // 新建目录
    utils.mkdirsSync(dir)
    // 新建文件
    utils.generateFile(targetFilePath, str)
  })
}

const addTypes = (name, dir)=>{
  // 1.获取模板需要的数据
  const data = utils.getTemplateData(name, dir)
  // 模板文件路径
  const templateFilePath = utils.resolveReallyPath('../template/src/store/modules/login/types.js.ejs')
  // 生成目标文件的路劲
  const targetFilePath = utils.resolveRelativePath(`${dir}/types.js`)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 编译成功
  .then((str)=>{
    // 新建目录
    utils.mkdirsSync(dir)
    // 新建文件
    utils.generateFile(targetFilePath, str)
  })
}
module.exports = {
  addPageStore
}