
/**
 * 首字母 大写
 * @param {*} name  Name
 */
const upperCaseFirstName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

/**
 * 首字母 小写
 * @param {*} name name
 */
const lowerCaseFirstName = (name) => {
  return name.charAt(0).toLowerCase() + name.slice(1)
}

/**
 * 获取组件文件夹的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return demo1btn 或者  demo/demo1btn 或者 demo/demo1-btn
 */
const getDirPath = (dirName) => {
  // 2.转成小写
  return dirName.toLowerCase()
}

/**
 * 获取组件文件夹的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return demo1btn 或者  demo1btn 或者 demo1-btn
 */
const getComponentDirName = (dirName) => {
  // 1.先分词
  const dirs = dirName.split('/')
  const componentDirName = dirs.pop()
  // 2.转成小写
  return componentDirName.toLowerCase()
}

/**
 * 获取组件的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // Demo1btn 或者  Demo1btn 或者 Demo1Btn
 */
const getComponentName = (componentName) => {
  // 1.先分词
  const names = componentName.split('/')
  let compName = names.pop()
  compName = compName.toLowerCase()
  const compNames = compName.split('-')
  for (let i = 0; i < compNames.length; i++) {
    compNames[i] = upperCaseFirstName(compNames[i])
  }
  const name = compNames.join('')
  return name
}

/**
 * 获取组件的名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // demo1btn 或者  demo1btn 或者 demo1Btn
 */
const getComponentNameFirLow = (componentName) => {
  // 1.先分词
  const names = componentName.split('/')
  let compName = names.pop()
  compName = compName.toLowerCase()
  const compNames = compName.split('-')
  for (let i = 0; i < compNames.length; i++) {
    compNames[i] = upperCaseFirstName(compNames[i])
  }
  const name = compNames.join('')
  return lowerCaseFirstName(name)
}

/**
 * 获取是一级路由，还是二级路由，还是三级路由
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // 1 或者  1 或者  2
 */
const getRouteLevel = (dirName) => {
  // 1.先分词
  const names = dirName.split('/')
  return names.length
}

/**
 * 获取父亲路由名称
 * @param {*} dirName  dirName = demo1btn 或者 demo/demo1btn 或者 demo/demo1-btn
 * @param return // '' 或者  demo 或者  demo
 */
const getParentRouteName = (dirName) => {
  // 1.先分词
  const names = dirName.split('/')
  let result = ''
  if (names.length > 1) {
    result = names[names.length - 2] // 倒数第二个
  }
  return result
}

// console.log(getParentRouteName('demo1btn'))
// console.log(getParentRouteName('demo/demo1btn'))
// console.log(getParentRouteName('demo/demo1-btn'))
// console.log(getParentRouteName('demo/Demo1-Btn'))
// console.log(getParentRouteName('demo/Demo1-btn/sd'))

module.exports = {
  getDirPath,
  getComponentName,
  getComponentDirName,
  getComponentNameFirLow,
  getRouteLevel,
  getParentRouteName,

  upperCaseFirstName,
  lowerCaseFirstName
}
