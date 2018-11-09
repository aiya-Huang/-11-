/*
    路由使用步骤：
        1.安装
        2.导入模块
        3.在html中进行组件使用：router-link,router-view
        4.创建路由实例，并设置路由规则
            (path:to中写的跳转路径 component:导入单文件组件(即后缀为.vue) redirect:重定向)
        5.注入到根实例中

*/ 

// js文件中使用路由的固定方式
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 在vue原型上挂在上一个属性$axios
import axios from 'axios'
// 设置baseURL之后，发送请求的时候会把baseURL和路径拼接起来
axios.defaults.baseURL = "http://47.106.148.205:8899/"
// axios 允许携带cookie
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios


// 导入路由组件
// 用import引入文件，如果本文件中需要调用，就需要用：import xx from 'xx',否则直接：import 'xx'
// import goodslist from '../components/goods/goodslist.vue'
// // 注意：有时候写完代码，没有结果，要看这里是否 导对文件 
// import goodsinfo from "../components/goods/goodsinfo.vue"

// import shopcart from "../components/shopcart/shopcart.vue"

// import order from "../components/order/order.vue"

// import login from "../components/account/login.vue"

// import pay from "../components/pay/payorder.vue"

// import paySuccess from "../components/pay/paySuccess.vue"

// import vipCenter from "../components/vip/vipCenter.vue"

// import myOrders from "../components/vip/myOrders.vue"

// import orderInfo from "../components/vip/orderInfo.vue"
const goodslist = () => import(/* webpackChunkName: "goodslist" */ '../components/goods/goodslist.vue')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '../components/goods/goodsinfo.vue')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '../components/shopcart/shopcart.vue')
const order = () => import(/* webpackChunkName: "order" */ '../components/account/login.vue')
const login = () => import(/* webpackChunkName: "login" */ '../components/account/login.vue')
const pay = () => import(/* webpackChunkName: "pay" */ '../components/pay/payorder.vue')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '../components/pay/paySuccess.vue')
const vipCenter = () => import(/* webpackChunkName: "vipCenter" */ '../components/vip/vipCenter.vue')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '../components/vip/myOrders.vue')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '../components/vip/orderInfo.vue')

// 创建路由对象，并设置路由规则
const router = new VueRouter({
    routes:[
        {path:"/",redirect:"/goodslist"},
        {path:"/goodslist",component:goodslist},
        {path:"/goodsinfo/:goodsId",component:goodsinfo},
        {path:"/shopcart",component:shopcart},
        {path:"/login",component:login},
        {path:"/pay",component:pay},
        

        /*********下面的路由规则，是需要进行登录校验的******/ 
        {path:"/order",component:order, meta:{ checkoutLogin: true }},
        {path:"/paySuccess",component:paySuccess, meta:{ checkoutLogin: true }},
        {path:"/vipCenter",component:vipCenter, meta:{ checkoutLogin: true }},
        {path:"/myOrders",component:myOrders, meta:{ checkoutLogin: true }},
        {path:"/orderInfo",component:orderInfo, meta:{ checkoutLogin: true }},
    ],

})
/**
 * 判断是否登录：
 *  前提：设置路由规则中将需要判断登陆的，设置路由元信息
 *  1.通过路由守卫方法，拦截所有的请求路径
 *      1.1 判断是否含有路由元信息，有的话发请求，获取是否登录的信息
 *          登录就跳过，没登录就跳到登录界面   
 *      1.2 不含路由元信息的就跳过
 * 
 */
// 这个方法可以拦截到所有的路由跳转,如果不调用next，就不会跳转
// fullPath:带有参数的路径  path：不带参数的路径
router.beforeEach((to, from, next) => {
    if(to.path !== '/login'){  
        localStorage.setItem('wantVisitPath',to.fullPath)
    }
    if(to.meta.checkoutLogin){
        const url = 'site/account/islogin'
         // 在这里需要检查一下是否登录，如果登录了，next，
        // 如果没有登录，通过编程式导航 router.push(xxx)
        axios.get(url).then(response=>{
            if(response.data.code === 'logined'){
                next()
            }else{
                router.push({path:'/login'})
            }
        })
    }else{
        next()
    }
   
})

// 导出一个路由对象
export default router