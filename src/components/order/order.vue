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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <!-- Element提供的表单：status-icon显示校验后的反馈图标 -->
                                <!-- label：表单标题文本 label-width：文本的宽度-->
                                <!-- prop：传入 Form 组件的 model 中的字段 -->
                                <!-- rules：校验规则-->
                                <el-form :model="order" status-icon :rules="rules" ref="ruleRef" label-width="150px">
                                    <el-form-item label="收货人姓名：" prop="accept_name">
                                        <el-input style="width:500px;" v-model="order.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区：" prop="area">
                                        <!-- 省市联动的标签 -->
                                        <v-distpicker
                                        :province="order.area.province.value"
                                        :city="order.area.city.value"
                                        :area="order.area.area.value"
                                        @selected="onSelected"
                                         ></v-distpicker>
                                        <!-- 省市联动的标签 -->
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address">
                                        <el-input style="width:500px;" v-model="order.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile">
                                        <el-input style="width:500px;" v-model="order.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱：">
                                        <el-input style="width:300px;" v-model="order.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：">
                                        <el-input style="width:300px;" v-model="order.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                         <el-radio v-model="order.payment_id" label="6">在线支付
                                        <em>手续费：0.00元</em></el-radio>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio-group v-model="order.express_id" @change="expressChange">
                                            <el-radio label="1">顺丰快递
                                            <em>费用：20.00元</em></el-radio>
                                            <el-radio label="2">圆通快递
                                            <em>费用：10.00元</em></el-radio>
                                            <el-radio label="3">韵达快递
                                            <em>费用：8.00元</em></el-radio>
                                        </el-radio-group>                                                                      
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" width="50px">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show -89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="order.message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" @click="goBack">返回购物车</a>
                                        <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 本界面的重点：灵活使用使用Element的表单操作 和 省市联动组件
 *      表单操作：<el-form :model="order" status-icon :rules="rules" ref="ruleRef"                              label-width="150px">
 *           Element提供的表单：status-icon显示校验后的反馈图标 
             label：表单标题文本 label-width：文本的宽度
             prop：传入 Form 组件的 model 中的字段 
             rules：校验规则
        1.必填项和非必填项，填好后反馈的图标
        2.表单校验规则，自定义校验规则
        3.单选框 及绑定的默认显示项
 *  省市联动组件 ：
 *      标签上数据的赋值 以及 数据发生改变时出发的事件
 *      
 */
    // 导入省市联动的组件
    import VDistpicker from 'v-distpicker'
    // 按需导入本地存储
    import {getLocalGoods} from '../../common/localStorage.js'
    export default {
        components:{
            VDistpicker
        },
        data(){
            // 自定义校验规则
            var checkMobile = (rule, value, callback) => {
                // 判断不为空
                if (!value) {
                    return callback(new Error('电话不能为空'));
                }
                // 设置延时，有旋转效果
                setTimeout(() => {
                    // 写手机号的正则表达式
                    if ((/^1[3,4,5,6,7,8][0-9]{9}$/).test(value)){
                        callback()
                    }else{
                        callback(new Error('手机号码不合法'));
                    }
                },1000)      
            }
            return{
                goodsList:[],
                totalCount:0,
                totalPrice:0,
                // arrayId:[],
                // 将来要提交的数据
                // 写几个默认值
                order:{
                    accept_name:"小麦",
                    area:{
                        "province":{ "code": "440000","value": "广东省"},
                        "city":{ "code": "440300","value": "深圳市"},
                        "area":{"code": "440306","value": "宝安区"}
                    },
                    address:"庭威 #2栋 402",
                    mobile:"13612345678",
                    email:"xiaomai@163.com",
                    post_code:"516000",
                    payment_id:'6',
                    express_id:'1',
                    expressMoment:20,
                    message:'请快速发货',
                    goodsids:[],//商品id
                    cargoodsobj:{},//购买商品对象
                    goodsAmount:0,
                },
                // 表单校验规则
                rules:{
                    //  required: true 设置是否为必填项
                    accept_name:[
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                    ],
                    area:[
                        { required: true, message: '请输入归属地', trigger: 'blur' },
                    ],
                    mobile:[
                        {  required: true,validator: checkMobile, trigger: 'blur' }
                    ],
                    address:[
                        { required: true, message: '请输入收货地址', trigger: 'blur' },
                    ],

                }
            }
        },
        computed: {
            getTotalAmount() {
                return this.totalPrice + this.order.expressMoment
            }
        },
        created(){
            this.getOrderGoods()
        },
        methods:{
            // 省市联动发生变动，触发
            onSelected(data){
                this.order.area = data
            },
            // 更改快递方式
            expressChange(label){
                switch(label){
                    case"1":
                        this.order.expressMoment = 20
                        break
                    case"2":
                        this.order.expressMoment = 10
                        break
                    case"3":
                        this.order.expressMoment = 8
                        break
                    default:
                        break
                }
            },
            // 订单详情展示
            getOrderGoods(){
                const localGoods = getLocalGoods()
                this.order.goodsids = this.$route.query.ids
                // console.log(this.order.goodsids);
                this.$axios.get(`site/validate/order/getgoodslist/${this.$route.query.ids}`).then(response=>{
                    response.data.message.forEach(item => {
                        item.buycount = localGoods[item.id]
                        this.totalCount += item.buycount
                        this.totalPrice += item.buycount * item.sell_price
                        this.order.cargoodsobj[item.id] = item.buycount
                    });
                    this.goodsList = response.data.message 
                    // this.arrayId = this.$route.query.ids.split(',')
                    // console.log(this.order);
                    this.order.goodsAmount = this.totalPrice
                    
                })
            },
            // 返回购物车
            goBack(){
                // 两种方式
                // this.$router.push({path:"/shopcart"})
                this.$router.back(-1)
            },
            // 下单操作
            goToOrder(){
                this.$refs.ruleRef.validate((valid) => {
                    // valid:有效的
                    if (!valid) {
                        console.log('error submit!!');
                        return 
                    } 
                    this.$axios.post(`site/validate/order/setorder`,this.order).then(response=>{
                        if(response.data.status === 0){                           
                            // 1.点击按钮后，跳转页面
                            this.$router.push({path:"/pay",query:{orderid:response.data.message.orderid}})

                            // 2.删除本地订单信息
                            // 注意：由于这里先发生跳转，再通过（this.$route.query.ids）获取ids是获取不到
                            // 所以有两个解决方案：
                            // 1.调换删除的顺序
                            // 2.将前面存放在goodsids中的id，在这里使用
                            const arrayId = this.order.goodsids.split(',')
                            arrayId.forEach(id=>{
                                this.$store.commit('deleteGoods',id)
                            })
                        }
                    })
                });
            }
        }
    }

</script>
