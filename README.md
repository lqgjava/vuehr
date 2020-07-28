# vuehr

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#三、Vue 项目结构分析
1.概览
使用 CLI 构建出来的 Vue 项目结构是这个样子的
https://img-blog.csdnimg.cn/20190401200229188.png
里面我们需要关注的内容如下图，重点需要关注的我用小红旗标了出来
https://img-blog.csdnimg.cn/2019040120135655.png
其中我们最常修改的部分就是 components 文件夹了，几乎所有需要手动编写的代码都在其中。
接下来我们分析几个文件，目的是理解各个部分是怎么联系到一起的。

##2.index.html
首页文件的初始代码如下：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>wj-vue</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
就是一个普普通通的 html 文件，让它不平凡的是 <div id="app"></div> ，下面有一行注释，构建的文件将会被自动注入，也就是说我们编写的其它的内容都将在这个 div 中展示。

还有不普通的一点是，整个项目只有这一个 html 文件，所以这是一个 单页面应用，当我们打开这个应用，表面上可以有很多页面，实际上它们都只不过在一个 div 中。
##3.App.vue
上面图上我把这个文件称为“根组件”，因为其它的组件又都包含在这个组件中。
.vue 文件是一种自定义文件类型，在结构上类似 html，一个 .vue 文件即是一个 vue 组件。先看它的初始代码
```html
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```
大家可能注意到了，这里也有一句 <div id="app">，但跟 index.html 里的那个是没有关系的。这个 id=app 只是跟下面的 css 对应。
<script>标签里的内容即该组件的脚本，也就是 js 代码，export default 是 ES6 的语法，意思是将这个组件整体导出，之后就可以使用 import 导入组件了。大括号里的内容是这个组件的相关属性。
这个文件最关键的一点其实是第四行， <router-view/>，是一个容器，名字叫“路由视图”，意思是当前路由（ URL）指向的内容将显示在这个容器中。也就是说，其它的组件即使拥有自己的路由（URL，需要在 router 文件夹的 index.js 文件里定义），也只不过表面上是一个单独的页面，实际上只是在根组件 App.vue 中。


