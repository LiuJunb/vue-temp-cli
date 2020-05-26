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
  console.log('targetFilePath=',targetFilePath)
  // 2.开始编译模板（模板文件，数据）
  utils.compiler(templateFilePath, data)
  // 编译成功
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