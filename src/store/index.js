// 导入vuex，并集成
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 按需引入自己定义的操作商品的方法
import {addLocalGoods,getTotalCount,updateLocalGoods,deleteLocalGoods} 
from "../common/localStorage.js"


// 创建vuex实例，里面的核心代码都是对象
const store = new Vuex.Store({
    // 存放数据：定义一个数据
    state:{
        buyCount:0 
    },
    // 将数据暴露出去，给需要的地方
    // 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
    // 且只有当它的依赖值发生了改变才会被重新计算。
    getters: {
        getBuyCount(state) {
            // return state.buyCount > 0 ? state.buyCount : getTotalCount()
            // 如果 state.buyCount === 0,说明是第一次刷新，获取本地存储的值
            // 否则不是第一次刷新，就把累加后的值返回
            return state.buyCount === 0 ? getTotalCount() : state.buyCount 
        }
    },
    // 定义方法：通过函数对数据进行操作
    mutations: {
        /**     
            * 参数： 
            *   state 上面的state
            *   goods 载荷就是参数，约定{goodsId:90,count:3}
        */
        // 添加商品    
        addGoods (state,goods) {
            // state.buyCount+=goods.count  
            // 将函数返回的总数量，赋值给购物车中的数量
            state.buyCount = addLocalGoods(goods)
        },
        // 修改商品
        updateGoods(state,goodschange){
            state.buyCount = updateLocalGoods(goodschange)
        },
        // 删除商品，只需要获取id即刻删除
        deleteGoods(state,goodsId){
            state.buyCount = deleteLocalGoods(goodsId)
        }
      }
   
})

// 导出vuex
export default store