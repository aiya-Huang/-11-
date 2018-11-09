<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        选择
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodList" :key="item.id">
                                    <td width="48" align="center">
                                        <!-- 双向绑定一个属性 -->
                                        <el-switch v-model="item.isSelect">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url" style="width:50px">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <!-- 通过父子组件进行传值，显示 -->
                                        <inputnumber 
                                        :goodsId="item.id" 
                                        :count="item.buycount"
                                         @goodsCountChange="getGoodsChange"></inputnumber>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click="deleteGoods(index)" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr v-if="goodList.length === 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueShop">继续购物</button>
                            <button class="submit" @click="goToPay">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.shopInfo {
  display: flex;
  /* 副轴对齐方式 */
  align-items: center;
}
</style>

<script>
    /**
     * 实现效果：
     *  1.将加入购物车的商品渲染出来
     *      - 取出本地存储中商品对象，获取id并拼接为符合参数要求的形式
     *      - 拼接参数发请求
     *      - 将购买数量进行赋值
     *  2.通过父子组件传值，主要用于修改商品数量，子传父：自定义函数 
     *  3.调用store中的函数，修改本地存储中的数据
     *  4.删除数据，调用store中的函数，删除本地存储中的数据
     *      进行删除操作时，使用element-ui库中的api:开关，消息提示
     *  5.通过计算属性，获取到商品总数量和总价格，因为当数据发生改变时，计算属性能根据依赖的数据发生变化
     *  6.跳转到订单页面，跳转前进行商品是否存在判断，还要进行是否登录判断
     *      思路：到路由控制界面拦截所有路径，判断是否含有 需要登录路由元的信息
     */
    import {getLocalGoods} from '../../common/localStorage.js'
    import inputnumber from '../../components/subcommons/inputnum.vue'
// 导出的是实例化的vue实例
export default {
  // 局部组件，
  components: {
    inputnumber
  },
  data() {
    return {
      goodList: []
    }
  },
  created() {
    this.getGoodListData()
  },
  // 计算属性要有返回值
  computed: {
    // 总数量 和 总价格 都是通过计算属性动态改变的，依赖于goodList
    // 获取总数量
    getTotalCount() {
      let totalCount = 0
      this.goodList.forEach(item => {
        if (item.isSelect) {
          totalCount += item.buycount
        }
      })
      return totalCount
    },
    // 获取总价格
    getTotalPrice() {
      let totalPrice = 0
      this.goodList.forEach(item => {
        if (item.isSelect) {
          totalPrice += item.buycount * item.sell_price
        }
      })
      return totalPrice
    }
  },
  methods: {
    // 获取购物车的数据
    getGoodListData() {
      // 将存储在本地的数据取出来
      const localGoods = getLocalGoods()
      // 将对象中的key提取成一个数组
      const keys = Object.keys(localGoods)
      // 判断本地存储是否有数据
      if (keys.length === 0) {
        return
      }
      // 发请求，keys.join(','):将数组元素通过“,” 拼接成字符串
      const url = `site/comment/getshopcargoods/${keys.join(',')}`
      this.$axios.get(url).then(response => {
        response.data.message.forEach(item => {
          // 原本发请求来的数据购买量为0，要将本地存储的购买量赋值给，
          // 添加到购物车中的商品的buycount属性中 
          // 通过id取出购买量，赋值给buycount
          item.buycount = localGoods[item.id]
          // 给每一个商品分别双向绑定一个属性，而不是共用一个属性
          // 避免元素同时开关
          item.isSelect = true
        })
        this.goodList = response.data.message
      })
    },
    // 通过自定义函数(与子组件保持一致)，获取子组件中的载荷
    // 修改商品数据
    getGoodsChange(goodschange) {
      // 将子组件中操作后的数量传递过来，然后修改goodList中的数量
      // 只要goodList发送改变，就会通过计算属性，改变总数量，总价格
      this.goodList.forEach(item => {
        if (item.id === goodschange.goodsId) {
          item.buycount = goodschange.count
        }
      })
      // 调用函数
      this.$store.commit('updateGoods', goodschange)
    },
    // 删除商品数据
    deleteGoods(index) {
      this.$confirm('您确定要删除商品吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
           //注意：要先删除本地的数据，再去删除页面上的数据 
           // 避免先干掉本地后，删除本地时的index，会发生变化   
           this.$store.commit('deleteGoods', this.goodList[index].id)
           this.goodList.splice(index, 1) 
        })
        .catch(() => {
         
        })
    },
    // 继续购物
    continueShop(){
        this.$router.push({path:'/goodslist'})
    },
    // 立即结算
    goToPay(){
        let ids = []
        this.goodList.forEach(item=>{
            if(item.isSelect){
                ids.push(item.id)
            }
        })
        if(this.goodList.length === 0){
             this.$message({
                message: '请至少选择一种商品进行结算',
                type: 'warning'
            });
            return
        }
        this.$router.push({path:'/order',query:{ids:ids.join(',')}})
    }
     
  }
}
</script>