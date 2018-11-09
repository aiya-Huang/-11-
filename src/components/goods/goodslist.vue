<template>
   <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsData.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                             <!--左边小标题-->
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                           
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                 <!--右边轮播图上的小标题-->
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <el-carousel :interval="3000" arrow="always" height="341px">
                                    <el-carousel-item v-for="item in goodsData.sliderlist" :key="item.id">
                                         <img :src="item.img_url">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <!--右边热门商品-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsData.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <!--注意：值绑定数据不需要加{{}}-->
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                     <!--过滤器进行格式化日期-->
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>              
                        </ul>
                    </div>
                    <!--右边热门商品-->
                </div>
            </div>
        </div>
        <!--中间的商品列表区域-->
        <div class="section" v-for="item in goodsList" :key="item.level1cateid">
            <div class="main-tit" >
                <h2>{{item.catetitle}}</h2>
                <p>
                    <!--注意这里遍历的数组，是goodsList的每一项的level2catelist：item.level2catelist-->
                    <!-- 而不是 goodsList.level2catelist,goodsList是一个数组，每一项又是一个对象 -->
                    <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" href="/goods/43.html">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <!-- 同理遍历的数组是：item.datas-->
                        <li v-for="subitem in item.datas" :key="subitem.artID">
                            <!-- 设置路由组件，设置跳转路径 -->
                            <router-link :to="'/goodsinfo/'+subitem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy ="subitem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{subitem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{subitem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{subitem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{subitem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<style scoped>

    .el-carousel__item img{
        width:100%;
        height:100%
    }

</style>

<script>
/**
    axios 与 jQuery 导入方式的升级
    axios 在路由控制页面导入，并将$axios挂载到vue上，供子组件去调用
    jQuery 在index.html页面通过script的src属性导入cdn版的jQuery
    cdn:内容分发网络,采用各种缓存服务器，分布到用户访问相对集中的地区或网络上，当用户进行访问时，
        利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求。
        优点：提高用户的体验感，阅览更为流畅
 */
    // import axios from "axios"
    export default {
        data(){
            return{
                // 返回一个对象
                goodsData:{},
                goodsList:[]
            }
        },
        created(){
            this.getGoodsData()
            this.getDoodsListData()
        },
        methods:{
            getGoodsData(){
                const url = "site/goods/gettopdata/goods"
                this.$axios.get(url).then(response=>{
                    // 数据是一个对象类型
                    this.goodsData = response.data.message
                })
            },
            getDoodsListData(){
                const url = "site/goods/getgoodsgroup"
                this.$axios.get(url).then(response=>{
                    // 数据是一个数组类型
                    this.goodsList= response.data.message
                })
            }
        }
    }
</script>