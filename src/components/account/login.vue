<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model="user_name" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input @click="login" id="btnSubmit" name="btnSubmit" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    /**
     *      1.登陆成功后，页面的跳转路径需要在路由控制里面，进行保存到本地存储中，成功后取出进行跳转
     *      2.非父子组件之间传值，通过bus进行自定义事件传值，类似于子组件传值父组件
     *         步骤：1.定义一个vue实例bus
     *              2.传值方：bus.$emit('自定义函数名')
     *              3.接收方：bus.$on("自定义函数名",()=>{代码实现})
     * 
     */
    import {bus} from "../../common/commonvue.js"
    export default {
        data(){
            return{
                user_name:"lisi",
                password:'123'
            }
        },
        methods:{
            login(){
                const url = `site/account/login`
                this.$axios.post(url,{user_name:this.user_name,password:this.password}).then(response=>{
                    if(response.data.status === 0){                       
                        this.$router.push({path:localStorage.getItem('wantVisitPath')})
                        // 非父子组件之间传值，通过bus进行自定义事件传值，类似于子组件传值父组件
                        // 告诉App.vue的头部进行变化
                        bus.$emit('loginSuccess')
                    }
                })
            }
        }
    }

</script>
