<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">微人事</div>
                <el-dropdown class="userInfo" @command="commandHandler">  <!--@command="commandHandler" 点击菜单项触发的事件回调-->
                    <span class="el-dropdown-link">
    {{user.name}}<i><img :src="user.userface" alt=""></i>    <!--i标签表示目标-->
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>   <!--disabled:禁用的    divided:有分隔线-->
                        <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router unique-opened="">
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                            <!--这个遍历拿到的是index.js里面的routers地址数组 -->
                            <template slot="title">
                                <i style="color: #409eff;margin-right: 10px" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :index="child.path" v-for="(child,index) in item.children" :key="index">
                                    {{child.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <!--通过this.$router.currentRoute.name:获取当前路由对象的name属性-->
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">欢迎来到微人事！</div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem("user"))  //这样得到的数据是字符串，要用JSON.parse方法吧字符串转换成json数据

            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            commandHandler(cmd) {  //该方法有一个参数，cmd
                if (cmd == 'logout') {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout"); //使用封装好的getRequest方法，参数写注销登录的地址
                        window.sessionStorage.removeItem("user");
                        //初始化，给个空数组
                        this.$store.commit('initRoutes', [])
                        this.$router.replace("/");
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        }
    }
</script>

<style>
    .homeWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: #409eff;
        padding-top: 50px;
    }

    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center; /*竖轴上居中*/
        justify-content: space-between; /*空白的地方在中间*/
        padding: 0 15px;
        box-sizing: border-box;
    }

    .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff;
    }

    .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>