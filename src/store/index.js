import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //定义变量的
    state:{
        //这是我的路由数组，一会从服务器上加载下来的菜单项都放在这个数组里面去
        routes:[]
    },
    //修改变量的方法  想当于是java中的setter方法
    mutations:{
        //通过方法放   state:要通过state才可以访问到上面的state变量里面的routes数组   data：传进来的参数  等下去调用只需要传data参数即可
        initRoutes(state,data){
            state.routes=data;
        }
    },
    actions:{

    }

})