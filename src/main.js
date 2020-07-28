import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {postKeyValueRequest} from "./utils/api";
import {postRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'


Vue.prototype.postRequest=postRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
  //如果你要去的页面是login页，直接next
  if (to.path=='/'){
    next();
  }else {
    //如果你要去的是其他页面呢,就是用initMenu初始化菜单的方法
    initMenu(router,store);
    next();
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
