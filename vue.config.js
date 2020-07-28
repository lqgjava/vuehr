//配置请求转发的代理
//定义代理的对象
let proxyObj={};

proxyObj['/']={  //拦截http请求
    ws:false,    //关掉websocket
    target:'http://localhost:8081',   //把拦截掉的请求转发到8081端口上去
    changeOrigin: true,   //
    pathRewrite:{         //请求地址重写
        '^/':''   //拦截到的地址不去修改它
    }
}
//把这个导出来
module.exports={
    devServer:{  //配置开发环境
        host:'localhost', //端口号
        port:8080,
        proxy:proxyObj  //代理对象
    }
}