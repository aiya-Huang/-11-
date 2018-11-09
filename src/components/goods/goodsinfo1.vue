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
                                                    <el-input-number v-model="buyCount" :min="1" :max="goods.goodsinfo.stock_quantity" label="描述文字"></el-input-number>
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
                                                    <button @click="addToCart" ref="addToCartref" class="add">加入购物车</button>
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
                                                <a href="javascript:;" :class="isShowComment?'':'selected'" @click="isShowComment=false">商品介绍</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" :class="isShowComment?'selected':''" @click="isShowComment=true">商品评论</a>
                                            </li>
                                        </ul>
                                    </div>
                                </Affix>
                                <!-- 商品介绍 -->
                                <div class="tab-content entry" style="display: block;padding:10px;" v-show="!isShowComment">
                                    <div v-html="goods.goodsinfo.content"></div>
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
                                                    <textarea id="txtContent" ref='texrareaRef' name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                                <div class="subcon">
                                                    <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                    <span class="Validform_checktip"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <ul id="commentList" class="list-box">
                                            <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                            <li v-for="item in commentList" :key="item.id">
                                                <div class="avatar-box">
                                                    <i class="iconfont icon-user-full"></i>
                                                </div>
                                                <div class="inner-box">
                                                    <div class="info">
                                                        <span>{{item.user_name}}</span>
                                                        <span>{{item.add_time | dateFmt('YYYY-MM-DD hh:mm:ss')}}</span>
                                                    </div>
                                                    <p>{{item.content}}</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                            <el-pagination 
                                            @size-change="handleSizeChange" 
                                            @current-change="handleCurrentChange" 
                                            :current-page="pageIndex" 
                                            :page-sizes="[2, 5, 10, 20]" 
                                            :page-size="pageSize" 
                                            layout="total, sizes, prev, pager, next, jumper" 
                                            :total="total">
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
                                                <!-- 这里使用拼接，id值是一个变量，直接写会变成一个字符串 -->
                                                <!-- 这里点击发生变化，需要通过watch监听，重新刷新数据 -->
                                                <router-link :to="'/goodsinfo/'+item.id" class="">
                                                    <img v-lazy ="item.img_url">
                                                </router-link>
                                            </div>
                                            <div class="txt-box">
                                                <router-link :to="'/goodsinfo/'+item.id" class="">
                                                    {{item.title}}
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
         <!-- 动画盒子 -->
            <transition
            v-on:before-enter='beforeEnter'
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            >
                <div v-if="goods.imglist" ref="animateref" class="animateDiv" v-show="isShow">
                    <!-- 注意：这里的imglist是一个数组，要有下标-->
                    <img :src="goods.imglist[0].original_path" alt="" >
                </div>
            </transition>
    </div>
</template>

<style scoped>
    /* style中的css样式，必须要在后面添加上分号';'，否则会报错 */
    /* 妈的，引入个magnifier.css,还能把r搞掉了 */
    @import '../../statics/site/jquery_plugins/jqimgzoom/css/magnifier.css';
    .animateDiv,.animateDiv img{
        width: 50px;
        height: 50px;
    }
    .animateDiv {
        position: absolute;
    }
</style>


<script>
import '../../statics/site/jquery_plugins/jqimgzoom/js/magnifier.js'

// 需要图钉效果，按需引用
import { Affix } from 'iview'
export default {
  components: {
    Affix
  },
  data() {
    return {
      goods: {},
      buyCount: 0,
      isShowComment: false,
      pageIndex: 1,
      pageSize: 5,
      commentList: [],
      total: 0,
      addToCartOffset:{},
      shopCartOffset:{},
      isShow:false
    }
  },
  // 页面一打开就获取数据
  created() {
    this.getGoodsInfo()
    this.getCommentInfo()
  },
  // 当数据发生变化时重新渲染
  updated() {
    // 初始化放大镜
    $('#magnifier1').imgzoon({ magnifier: '#magnifier1' })
  },
  watch: {
    // $route是一个函数
    $route() {
      this.getGoodsInfo()
    }
  },
  methods: {
    // 获取商品详情
    getGoodsInfo() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`
      this.$axios.get(url).then(response => {
        this.goods = response.data.message
        // 注意：这里必须使用箭头函数，否则this指向会报错，
        // 这里的this指的是：VueComponent即单文件组件本身
        // 箭头函数本身并没有this这个概念
        setTimeout(()=>{
            console.log(this);         
            this.addToCartOffset = $(this.$refs.addToCartref).offset()
            $(this.$refs.animateref).css({
                top:this.addToCartOffset.top,
                left:this.addToCartOffset.left
            })
            this.shopCartOffset = $('#shoppingCartCount').offset()       
        },200)
      })
    },
    // 获取评论列表
    getCommentInfo() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      this.$axios.get(url).then(response => {
        this.commentList = response.data.message
        this.total = response.data.totalcount
      })
    },
    // 改变页容量
    handleSizeChange(pageSize){
        this.pageSize = pageSize
        this.pageIndex = 1
        this.getCommentInfo()

    },
    // 改编页码数
    handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex
        this.getCommentInfo()
    },
    // 提交评论
    postComment(){
        const comment = this.$refs.texrareaRef.value
        const url = `site/validate/comment/post/goods/${this.$route.params.goodsId}`
        this.$axios.post(url,{commenttxt:comment}).then(response=>{
            if(comment.trim().length === 0){
                this.$message({
                    message: '请输入内容哟',
                    type: 'warning'
                });
                return
            }
            this.$message({
                message: '评论成功',
                type: 'success'
            });
            // 重置当前页码为1，重新刷新数据
            this.pageIndex = 1
            this.getCommentInfo()
            this.$refs.texrareaRef.value = ''
        })
    },
    // 加入购物车
    addToCart(){
        this.isShow = true
    },
    // 动画钩子
    beforeEnter(el){
        el.style.top = this.addToCartOffset.top + 'px'
        el.style.left = this.addToCartOffset.left + 'px'
        el.style.transform = 'scale(1.0)'

    },
    enter(el,done){
        el.style.transition = "all 0.6s"
        el.offsetHeight
        el.style.top = (this.shopCartOffset.top-10) + 'px'
        el.style.left = this.shopCartOffset.left + 'px'
        el.style.transform = 'scale(0.4)'
        done()
    },
    afterEnter(el){
        this.isShow = false
    }
  }
}
</script>

