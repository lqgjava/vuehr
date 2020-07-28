<template>
    <div class="login-wrap">
        <!--element ui的表单验证规则配置 用 :rules="rules"这是简写的，本来是v-model:rules="rules"-->
        <!--:model 表单里面的数据对象-->
        <el-form :rules="rules" :model="loginForm" class="loginContainer" ref="loginForm">
            <h3 class="loginTitle">系统登录</h3>
            <!--表单里面的每一项叫做<el-form-item></el-form-item,要加个prop属性，本来是不用加的，但是我们这个使用了字段校验，这种情况家就一定要加prop属性-->
            <el-form-item prop="username">
                <!--auto-complete:是否自动补全-->
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"
                          @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-checkbox class="loginRember" v-model="checked"></el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>

</template>

<script>
    // import {postKeyValueRequest} from "../utils/api"; 使用了插件后就不用导入了，使用this.
    export default {
        name: "Login",
        data() {
            return {
                radio: "选中且禁用",
                redio: "1",
                radio: 3,
                radio1: "上海",
                radio2: "上海",
                radio3: "上海",
                radio4: "上海",
                radio1: "1",
                radio2: "1",
                radio3: "1",
                radio4: "1",
                checked: true,
                checked1: false,
                checked2: true,
                checked1: false,
                checked2: true,
                loginForm: {
                    username: "admin",
                    password: "123"
                },
                checked: true,
                rules: {
                    //required:true:用户名必填  如果没填就弹出"请输入用户名",trigger:blur 触发的方式是blur
                    username: [
                        {required: true, messsage: "请输入用户名", trigger: "blur"}
                    ],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}]
                }
            };
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate(validate => {
                    if (validate) {
                        this.postKeyValueRequest("/doLogin", this.loginForm).then(resp => {
                            //resp：从服务端拿到的数据  用户的数据要保存到哪里？ 保存在sessionSto  打开就没了
                            if (resp) {
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj)); //不能直接写resp.obj,这是一个js对象，我们要把它转成字符串
                                //页面跳转  replace：替换  用push的话，可以使用后退按钮回到登录页，用replace不可以回到登录页
                                this.$router.replace("/home");
                                // alert(JSON.stringify(resp));
                            }
                        }); //then里面的参数就是服务端返回的参数
                    } else {
                        this.$message.error("请输入所有字段");
                        return false;
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .login-wrap {
        background-image: url(../assets/login-bg.jpg);
        width: 100%;
        height: 100%; /**宽高100%是为了图片铺满屏幕 */
        z-index: -1;
        position: absolute;
    }

    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRember {
        text-align: left;
        margin: 0 0 25px 0;
    }

    #dxk {
        margin-left: 800px;
    }

    #checkbox {
        margin-left: 800px;
    }
</style>