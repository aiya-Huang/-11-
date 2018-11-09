module.exports = {
    baseUrl:"./",//设置baseUrl，在index.html中导入js，其他文件用到
    productionSourceMap:false,//不生成sourse Map文件
    lintOnSave:false ,//暂时关掉eslint的检查
    configureWebpack:{
        // 左边是包的名字，右边的是常用的名字
        externals:{
            vue:'Vue',
            axios:'axios',
            'vue-router':'VueRouter',
            vuex:'Vuex',
            moment:'moment',
            'vue-lazyload':'VueLazyload',
            'v-distpicker':'VDistpicker'
        }
    }
}