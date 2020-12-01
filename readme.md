# admin-app-system

## 1.运行脚手架项目

Project setup

```
npm install
```

Compiles and hot-reloads for development

```
npm run serve
```

Compiles and minifies for production

```
npm run build
```

## 2.全局安装脚手架

```
npm install -g @liujunb/vue-temp-cli

```
## 2.常用命令


```

# 新建一个项目
vue-temp-cli create hyzs-vue-admin

# 新建一个普通组件模板
vue-temp-cli addCom xxx -d src/components/xxx
# 新建一个对话框组件
vue-temp-cli addModal gen-modal -d src/views/main/gen-modal
# 新建一个页面组件模板
vue-temp-cli addPage demo -d src/views/main/demo
# 新建一个Store模块
vue-temp-cli addStore example -d src/store/main/example
# 新建一个Service层
vue-temp-cli addService example -d src/service/main/example

# 新建普通page, store, service 3层代码
vue-temp-cli addPSS example -d src/views/main/example
# 新建表格page, store, service 3层代码
vue-temp-cli addTablePSS gridview -d src/views/main/gridview
# 新建九宫格page, store, service 3层代码
vue-temp-cli addGridPSS gen-page -d src/views/main/gen-page
# 新建统计page, store, service 3层代码
vue-temp-cli addHomePSS gen-page -d src/views/main/gen-page

```


# 3.使用到的依赖

```
  "dependencies": {
    "chalk": "^4.0.0",
    "clear": "^0.1.0",
    "commander": "^5.1.0",
    "download-git-repo": "^3.0.2",
    "ejs": "^3.1.3",
    "figlet": "^1.4.0",
    "open": "^7.0.4",
    "inquirer": "^7.1.0",
    "ora": "^4.0.4"
  },

  "dependencies": {
    "axios": "^0.19.2",
    "chalk": "^4.0.0",
    "child-process-promise": "^2.2.1",
    "commander": "^5.0.0",
    "download-git-repo": "^3.0.2",
    "handlebars": "^4.7.6",
    "inquirer": "^7.1.0",
    "metalsmith": "^2.3.0",
    "ora": "^4.0.4",
    "semver": "^7.3.2",
    "spawn-sync": "^2.0.0"
  },

```



