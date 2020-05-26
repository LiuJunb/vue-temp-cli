# node编写cli命令行(四)

该文章是在 `node编写cli命令行(三)` 的基础上继续编写的

## 1.编写 addStore 指令

编写一个 addStore 指令，例如当执行：`vue-temp-cli addStore login  -d /src/store/modules/login`  时，会在`/src/store/modules/login`目录下新建 `index.js  和 types.js` 

### 1.添加模板文件

新建一个 template 文件夹

```json
|-- mockjs
`-- src
    |-- base-ui
    |   `-- src
    |       `-- components
    |-- components
    |   `-- hello-world.vue.ejs
    |-- service
    |   |-- login
    |   |   `-- index.js.ejs
    |   `-- main
    |-- store
    |   `-- modules
    |       `-- login
    |           |-- index.js.ejs
    |           `-- types.js.ejs
    `-- view
        |-- login
        |   |-- login.vue.ejs
        |   `-- route.js.ejs
        `-- main
```

`index.js.ejs`  文件

```js
<%_ if (data) { _%>
import Types from './types.js'
import <%= data.firLowName %>Service from '@/service/<%= data.dirPath %>/index.js'
export default {
  // 1.启用命名空间
  namespaced: true,
  // 2.定义状态
  state: {
    data: {},
    list: {},
    detail: {}
  },
  // 3.修改状态
  mutations: {
    // 这里的 `state` 对象是模块的局部状态
    [Types.data](state, payload) {
      state.data = payload
    },
    [Types.list](state, payload) {
      state.list = payload
    },
    [Types.detail](state, payload) {
      state.detail = payload
    }
  },
  // 4.提交action，来修改状态
  actions: {
    async data(context, payload) {
      const result = await <%= data.firLowName %>Service.getData(payload)
      context.commit(Types.data, result.data)
      return Promise.resolve(result.data)
    },
    async list(context, payload) {
      const result = await <%= data.firLowName %>Service.getList(payload)
      context.commit(Types.list, result.data)
      return Promise.resolve(result.data)
    },
    async detail(context, payload) {
      const result = await <%= data.firLowName %>Service.getDetail(payload)
      context.commit(Types.detail, result.data)
      return Promise.resolve(result.data)
    }
  },
  // 5.获取定义的状态, 通过store.getters获取里面的函数,例如：store.getters.count
  getters: {
    // state 是获取局部状态；rootState是获取根状态
    data(state, getters, rootState, rootGetters) {
      return state.data
    },
    list(state, getters, rootState, rootGetters) {
      return state.list
    },
    detail(state, getters, rootState, rootGetters) {
      return state.list
    }
  }
}

<%_ } _%>
```



`types.js.ejs` 文件

```js
<%_ if (data) { _%>
export default {
  data: 'data',
  list: 'list',
  detail: 'detail'
}
<%_ } _%>

```



### 2.编写 addStore 指令

1.修改index.js文件

添加新建项目的 addcom 指令, 看下面的第5步

```json
#!/usr/bin/env node
var create = require('./lib/create')
var addcom = require('./lib/addcom')
var addPage = require('./lib/addPage')
var addStore = require('./lib/addStore')
var addService = require('./lib/addService')
var addPSS = require('./lib/addPSS')
var program = require('commander')

// 1.添加版本
.....

// 2.添加 options 选项（可供后面定义的指令使用该选项，获取选项的属性 program.xxx ）
.....

// 3.添加create指令
.....

// 5.添加 addcom 指令,例如：vue-temp-cli addcom Xxx -d src/view/main/
.....

// 6.添加 addPage 指令,例如：vue-temp-cli addPage Xxx -d src/view/main/
.....

// 7.添加 addStore  指令,例如：vue-temp-cli addStore index -d src/store/modules/login
program
.command('addStore <name>')
.description('add page store, 例如：vue-temp-cli addStore index -d src/store/modules/login')
.action((name)=>{
  addStore.addPageStore(name, program.dir)
})

// 8.添加 addService  指令,例如：vue-temp-cli addService index -d src/service/login
program
.command('addService <name>')
.description('add page service, 例如：vue-temp-cli addService index -d src/service/login')
.action((name)=>{
  addService.addPageService(name, program.dir)
})

// 9.添加 addPSS  指令,例如：vue-temp-cli addPSS xxx -d src/view/login/
program
.command('addPSS <name>')
.description('add page, store and service, 例如：vue-temp-cli addPSS xxx -d src/view/login/')
.action((name)=>{
  addPSS.addPSS(name, program.dir)
})

// 4.添加help提示信息
......
program.parse(process.argv);
```



2.编写 addStore.js 文件

该文件是addStore指令  代码的具体实现过程。

1）获取模板需要的数据（ 并且定义好：模板文件路径，生成目标文件的路劲 ）

2）开始编译模板，使用（模板文件，数据），返回编译后的结果

3）把编译后的结果写到指定 生成目标文件的路劲

```js

const utils = require('./utils')

/**
 * 1.新建一个页面对应的store
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
  // 生成目标文件的路劲
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
```



### 3.测试 addStore 指令

执行 `vue-temp-cli addStore index -d /src/store/modules/login` 命令，就会在执行该命令的路劲下：新建`/src/store/modules/login`这个目录，然后在该目录下新建 `index.js  和 types.js` 

```json
# 在执行指令目录下新建/src/store/modules/login文件夹，然后在该文件夹下面新建建 `index.js  和 types.js`, index 是固定的
vue-temp-cli addStore index -d /src/store/modules/login

# 下面这种是错误的写法（不能以/开头）
vue-temp-cli addStore index -d  /src/store/modules/login
```



## 2.编写 addService 指令

```json
# 在执行指令目录下新建/src/service/login文件夹，然后在该文件夹下面新建建 `index.js`, index 是固定的
vue-temp-cli addService  index -d /src/service/login

# 下面这种是错误的写法（不能以/开头）
vue-temp-cli addService  index -d  /src/service/login
```



## 3.编写 addPSS 指令

```json
# 在执行指令目录下新建/src/view/login文件夹
vue-temp-cli addPSS login -d src/view/login

# 下面这种是错误的写法（不能以/开头）
vue-temp-cli addPSS login -d  /src/view/login
```







