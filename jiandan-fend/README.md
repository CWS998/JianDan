# ggg

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

build/ config/ 脚手架配置代码，不用更改

src/ 存放真正项目源码的地方

/staic/ 存放万年不动的资源，存放不会被修改的静态语言 css js img，资源大，不修改

.babelrc 将项目里高版本的 js 代码语法（es6，es7，typescript），转换成低版本语法

.editorconfig 约束编码规范，给开发工具看

.eslintignore 告诉 eslint 不要检查相对应文件

.eslintrc.js eslint 配置文件

.gitignore git 服务器统一管理代码，这个文件里写的是忽略上传到服务器的文件

.postcss.js 自动更改 css 代码

src/assets/ 存放网站资源文件，资源小，经常修改

src/commpoents/ 存放网站所有页面 vue 文件

src/router/ 配置页面地址，存放 vue-router 路由配置文件

src/App.vue 页面最外层顶级父组件

src/main.js 程序核心入口文件，一般安装 vue 插件，UI 框架，全局方法变量就在这里配置

组件通讯

1.父-》子  props
2.子-》父  $emit()
3.非父子   $parent,$root,$children