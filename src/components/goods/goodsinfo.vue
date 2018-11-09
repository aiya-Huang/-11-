<template>
    <div>
        <div>
            <div class="section">
                <div class="location">
                    <span>当前位置：</span>
                    <a href="/index.html">首页</a> &gt;
                    <a href="/goods.html">购物商城</a> &gt;
                    <a href="/goods/42/1.html">商品详情</a>
                </div>
            </div>
            <!-- 页面会加载不止一次，页面一打开会加载一次，数据发生变化会加载一次 -->
            <!-- 这里对数据进行一个判断，进行选择性加载，当请求完成，有数据时才进行加载页面 -->
            <div class="section" v-if="goods.goodsinfo">
                <div class="wrapper clearfix">
                    <div class="wrap-box">

                        <div class="left-925">
                            <div class="goods-box clearfix">
                                <!-- 放大镜的代码写在这里 -->
                                <div class="pic-box">
                                    <div class="magnifier" id="magnifier1">
                                        <div class="magnifier-container">
                                            <div class="images-cover"></div>
                                            <!--当前图片显示容器-->
                                            <div class="move-view"></div>
                                            <!--跟随鼠标移动的盒子-->
                                        </div>

                                        <div class="magnifier-assembly">
                                            <div class="magnifier-btn">
                                                <span class="magnifier-btn-left">&lt;</span>
                                                <span class="magnifier-btn-right">&gt;</span>
                                            </div>
                                            <!--按钮组-->
                                            <div class="magnifier-line">
                                                <ul class="clearfix animation03">
                                                    <li v-for="item in goods.imglist" :key="item.id">
                                                        <div class="small-img">
                                                            <img :src="item.original_path" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <!--缩略图-->
                                        </div>
                                        <div class="magnifier-view"></div>
                                        <!--经过放大的图片显示容器-->
                                    </div>
                                </div>
                                <div class="goods-spec">
                                    <h1>{{goods.goodsinfo.title}}</h1>
                                    <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                    <div class="spec-box">
                                        <dl>
                                            <dt>货号</dt>
                                            <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                        </dl>
                                        <dl>
                                            <dt>市场价</dt>
                                            <dd>
                                                <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>销售价</dt>
                                            <dd>
                                                <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="spec-box">
                                        <dl>
                                            <dt>购买数量</dt>
                                            <dd>
                                                <div class="stock-box">
                                                    <el-input-number :min="1" :max="goods.goodsinfo.stock_quantity" size="small" v-model="buyCount"></el-input-number>
                                                </div>
                                                <span class="stock-txt">
                                                    库存
                                                    <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                                </span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd>
                                                <div id="buyButton" class="btn-buy">
                                                    <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                    <button ref="addToShopCartRef" @click="addShopCart" class="add">加入购物车</button>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="goodsTabs" class="goods-tab bg-wrap">
                                <Affix>
                                    <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                        <ul>
                                            <li>
                                                <!-- 根据条件切换class类名，通过值绑定 -->
                                                <a href="javascript:;" :class="isShowComment?'':'selected'" @click="isShowComment=false">商品介绍</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" :class="isShowComment?'selected':''" @click="isShowComment=true">商品评论</a>
                                            </li>
                                        </ul>
                                    </div>
                                </Affix>
                                <!-- 商品介绍 -->
                                <div class="tab-content entry" style="display: block;" v-show="!isShowComment">
                                    <div style="padding:5px" v-html="goods.goodsinfo.content"></div>
                                </div>
                                <!-- 商品评论 -->
                                <div class="tab-content" style="display: block;" v-show="isShowComment">
                                    <div class="comment-box">
                                        <div id="commentForm" name="commentForm" class="form-box">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="conn-box">
                                                <div class="editor">
                                                    <!-- 通过ref属性，获取该元素 -->
                                                    <textarea ref="textref" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                                <div class="subcon">
                                                    <!-- 添加点击提交函数，发请求 -->
                                                    <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul id="commentList" class="list-box">
                                            <p v-if="commentList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                            <li v-for="item in commentList" :key="item.id">
                                                <div class="avatar-box">
                                                    <i class="iconfont icon-user-full"></i>
                                                </div>
                                                <div class="inner-box">
                                                    <div class="info">
                                                        <span>{{item.user_name}}</span>
                                                        <span>{{item.add_time | dateFmt('YYYY-MM-DD hh:mm:ss') }}</span>
                                                    </div>
                                                    <p>{{item.content}}</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="left-220">
                            <div class="bg-wrap nobg">
                                <div class="sidebar-box">
                                    <h4>推荐商品</h4>
                                    <ul class="side-img-list">
                                        <li v-for="item in goods.hotgoodslist" :key="item.id">
                                            <div class="img-box">
                                                <!-- 根据id进行单页面跳转，拼接变量id -->
                                                <router-link :to="'/goodsinfo/'+ item.id" class="">
                                                    <!-- 使用图片懒加载 -->
                                                    <img v-lazy="item.img_url">
                                                </router-link>
                                            </div>
                                            <div class="txt-box">
                                                <router-link :to="'/goodsinfo/'+ item.id" class="">{{item.title}}
                                                </router-link>
                                                <span>{{item.add_time | dateFmt}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 动画的div -->
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <!-- 注意：这里绑定的属性都加在div盒子上，不然出不来效果 -->
            <div class="animateDiv" v-if="goods.imglist" ref="animateDivRef" v-show="isShow">
                <img :src="goods.imglist[0].original_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* 导入放大镜的样式 */
@import "../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css";

.animateDiv,
.animateDiv img {
  width: 50px;
  height: 50px;
}
.animateDiv {
  position: absolute;
}
</style>

<script>
// 我是修改后的代码
/**
 *    1.放大镜的使用
 *    2.图钉效用的实现
 *    3.路由跳转，不刷新，通过watch监控vue实例中属性的变化
 *    4.评论中分页，使用Element中的分页api
 *    5.Vue中的动画效果，点击按钮，改变偏移量，显示与隐藏  
 * 
 * 
 */
// 导入放大镜的js代码
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'

// 按需导入所需要的组件
import { Affix } from 'iview'

// 不想每个组件都导入axios，借鉴一下vue-resource
// import axios from 'axios'
// default与{之间要有空格，否则data无颜色
export default {
  // 导入Affix图钉的组件
  components: {
    Affix
  },
  data() {
    return {
      goods: {}, // 商品数据
      buyCount: 0, //购买数量
      isShowComment: false, //是否显示评论
      pageIndex: 1, //页码
      pageSize: 2, //页容量
      commentList: [], //评论内容
      total: 0, //评论总数量
      addToCartOffset: null, //加入购物车按钮偏移量
      shopCartOffset: null, //顶部购物车偏移量
      isShow: false //动画图片是否显示
    }
  },
  created() {
    // 获取商品数据
    this.getGoodsData()
    // console.log(this)
    this.getCommentListData()
  },
  // 这个生命钩子会在数据变化的时候重新渲染
  // mounted 函数只会初始化一次   
  // 考虑到会切换商品  
  updated() {
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
  },
    
    // 两种用法，都可以出现数据
    // '$route':'getGoodsData'
    // watch监控整个Vue实例中的属性
    watch: {
        $route() {
            this.getGoodsData()
            this.getCommentListData()
        }
    },
    methods: {
        // 获取商品详情
        getGoodsData() {
            // params传值方式
            const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
            this.$axios.get(url).then(response => {
                this.goods = response.data.message
                // 注意：这里必须使用箭头函数，否则this指向会报错，
                // 这里的this指的是：VueComponent即单文件组件本身
                // 箭头函数本身并没有this这个概念
                // 动画的图片需要在页面数据加载完成在显示出来
                setTimeout(() => {
                // 获取按钮的偏移量
                this.addToCartOffset = $(this.$refs.addToShopCartRef).offset()
                // 设置被动画图片的位移偏移量
                $(this.$refs.animateDivRef).css({
                    top: this.addToCartOffset.top,
                    left: this.addToCartOffset.left
                })
                // 获取结束动画的偏移量
                this.shopCartOffset = $('#shoppingCartCount').offset()
                }, 200)
        })
    },
    // 获取评论的数据
    getCommentListData(){
        // 注意：url里面的参数不要有空格，否则出不来数据
        const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        this.$axios.get(url).then(response => {
            this.commentList = response.data.message
            this.total = response.data.totalcount
        })
    },
    // 改变页容量
    handleSizeChange(pageSize) {
      // 选择不同页容量后重置页码数为起始页
      this.pageIndex = 1
      this.pageSize = pageSize
      // 刷新数据
      this.getCommentListData()
    },
    // 改变当前页码
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex
      this.getCommentListData()
    },
    // 提交评论
    postComment() {
      // 使用 this.$refs.xx 获取 dom元素
      const comment = this.$refs.textref.value
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`
      this.$axios.post(url, { commenttxt: comment }).then(response => {
        // 当评论为空，点击提交，会有提醒
        if (comment.trim().length === 0) {
          this.$message({
            message: '请进行评论哦',
            type: 'warning'
          })
          return
        }
        // 当评论完成，点击提交，会有提醒
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        // 页码重置为1,显示自己的评论
        this.pageIndex = 1
        // 重新获取数据
        this.getCommentListData()
        // 清空评论框中的内容
        this.$refs.textref.value = ''
      })
    },
    // 点击按钮动画图片进行显示
    addShopCart() {
      this.isShow = true
      // 准备载荷
      const goods = {
          goodsId:this.$route.params.goodsId,
          count:this.buyCount
      }  
      // 调用添加商品的方法   
      this.$store.commit('addGoods',goods)
    },
    // 动画相关函数
    beforeEnter(el) {
      // 设置起始动画
      el.style.top = this.addToCartOffset.top + 'px'
      el.style.left = this.addToCartOffset.left + 'px'
      el.style.transform = 'scale(1.0)'
    },
    enter(el, done) {
      // 设置动画时间
      el.style.transition = 'all 0.5s'
      // 刷新动画帧
      el.offsetHeight
      // 设置结束动画
      el.style.top = this.shopCartOffset.top - 7 + 'px'
      el.style.left = this.shopCartOffset.left + 'px'
      el.style.transform = 'scale(0.5)'
      // 调用done函数
      done()
    },
    afterEnter(el) {
      this.isShow = false
    }
  }
}
</script>


