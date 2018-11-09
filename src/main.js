import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'


/*
    生产模式需要在main.js中关闭 ：Vue.config.productionTip = false ，
    作用是阻止 vue 在启动时生成生产提示。即不设false会在生产环境依旧提示：
        You are running Vue in development mode.
*/
Vue.config.productionTip = false

// 导入懒加载的模块
import VueLazyload from 'vue-lazyload'
// 集成懒加载，将图片更换，需要require进行导入
Vue.use(VueLazyload,{
    // 这种方法不起作用 
    // loading:"./statics/site/images/01.gif"
    loading:require("./statics/site/images/01.gif")
})


// 集成element-ui组件
// Vue.use(ElementUI);

// 在main.js中引入全局的css样式,先引入第三方样式，在引入自己的样式，为了可修改样式
// import 'element-ui/lib/theme-chalk/index.css'
import "./statics/site/css/style.css"

// 按需导入element-ui
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
  } from 'element-ui'

Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm


// 在main.js文件中导入路由
// 用import引入文件，如果本文件中需要调用，就需要用：import xx from 'xx',否则直接：import 'xx'
import router from "./router"
import store from "./store"

// 导入过滤器，到文件夹下是index.js时，可以只导入到文件夹，
import './filters'

// 创建vue根实例，整个项目只需要有一个根实例
new Vue({
  // 使用render函数，渲染跟组件
  render: h => h(App),
  router,
  store
}).$mount('#app')