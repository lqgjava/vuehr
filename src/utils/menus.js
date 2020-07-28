import {getRequest} from "./api";

//工具类方法
//定义一个菜单初始化的方法  参数router:因为菜单格式化好后要加到router里面来，所以要把router对象给我  store:这个数据我还要往store保存一份
export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    //url:请求接口   data:请求回来的数据
    getRequest("/system/config/menu").then(data => {
        if (data) {
            //定义一个fmtRoutes 这是格式化之后的
            let fmtRoutes = formatRoutes(data);
            //把router add 到fmtRoutes里面来
            router.addRoutes(fmtRoutes);
            //通过store.commit 第一个参数是方法的名字  第二个是格式化之后的fmtRoutes
            store.commit('initRoutes', fmtRoutes);
        }
    })
}

//格式化
export const formatRoutes = (routes) => {
    //这是我一会要返回去的数据
    let fmRoutes = [];
    routes.forEach(router => {
        //这是一个批量的变量定义
        let{
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        //判断是不是一个的children
        if (children && children instanceof Array) {
            //递归调用给它格式化一下
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls:iconCls,
            meta: meta,
            children: children,
            //要动态的去加载component  当成一个方法来处理，里面有一个参数叫resolve
            component(resolve) {
                if (component.startsWith("Home")){
                    require(['../views/'+component+'.vue'],resolve);
                } else if (component.startsWith("Emp")) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith("Per")) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sal")) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sta")) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith("Sys")) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
                //这是ES5里面的写法  []:请求组件的地址
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes;
}