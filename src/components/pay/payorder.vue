<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>
                                <div id="container">
                                    <canvas width="400" height="400"></canvas>
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
     *  二维码的使用：1.导入js  2.初始化代码（重要的是写在哪个生命钩子里）
     *  使用轮询（及定时器）实时监控支付的状态，因为是扫码操作，并没有点击操作
     *  要进行清除定时器：
     *      第一次清除定时器：当多次刷新时，会有创建出来的定时器来不及清除，就需要一开始就进行清除
     *      第二次清除定时器：当页面发生跳转后，会摧毁vue实例，在beforeDestroy生命钩子中清除定时器
     *      
     * 
     */
    //导入二维码的js 
    import "../../statics/site/jquery_plugins/qrcode/js/qrcode.js"
    export default {
        data(){
            return{
                orderInfo:{},
                timeInterval:-1
            }
        },
        created() {
            // 清除上一次存留的定时器
            clearInterval(this.timeInterval)
            this.getorderInfo()
            // 开始进入轮询
            this.task()
        },
        updated(){
            $('#container').erweima({
                mode: 4,
                mSize:20,
                image: $("#imgLogo")[0],
                // 扫描后，跳转的路径
                // 注意：url路径拼接的时候，参数不要有空格
                text: `http://47.106.148.205:8899/site/validate/pay/alipay/${
                      this.$route.query.orderid}` //自己公司提供的后台接口
            });
        },
        // 等dom元素加载完成后，执行mounted中的函数，且只执行一次
        // 不好使的时候，就用updated生命钩子，当再次刷新的时候，会重新加载
        // mounted() {
        //     // vue解析的时候，在去加载img的时候，如果发现有hidden属性，可能会延时加载
        //     setTimeout(()=>{
        //         $('#container').erweima({
        //             mode: 4,
        //             mSize:20,
        //             image: $("#imgLogo")[0],
        //             text: `http://47.106.148.205:8899/site/validate/pay/alipay/
        //             ${this.$route.query.orderid}` //自己公司提供的后台接口
        //         });
        //     },500)
        // },
        methods:{
            // 发请求渲染数据
            getorderInfo(){
                this.$axios.get(`site/validate/order/getorder/${this.$route.query.orderid}`).then(response=>{
                    // 当状态为支付成功后为2，进行跳转
                    if(response.data.message[0].status === 2){
                        this.$router.push({path:'/paySuccess'})
                        return
                    }
                    this.orderInfo = response.data.message[0]                    
                })
            },
            task(){
                // 不停地获取实时的支付状态，由于是扫码支付
                this.timeInterval = setInterval(()=>{
                    this.getorderInfo()
                },3000)
                
            }
        },
        // 当扫码成功后，进行跳转页面，本页面就应该被摧毁了
        // vue实例摧毁前清除定时器
        beforeDestroy() {
            clearInterval(this.timeInterval)
        }
    }
</script>
