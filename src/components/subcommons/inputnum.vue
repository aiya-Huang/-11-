<template>
    <div>
        <div class="left" @click="subCount">-</div>
        <div class="center">{{initCount}}</div>
        <div class="right" @click="addCount">+</div>
    </div>
</template>
<style scoped>
    .left,.center,.right{
        width: 25px;
        height: 25px;
        border: 1px solid #ccc;
        display: inline-block;
        text-align: center;
        line-height: 25px;
    }
    .center{
        width: 30px;
        margin: 0 2px;
    }
</style>

<script>
/**
    子组件：
        操作数据时，一般需要在data中定义一个变量进行初始值等于父组件中传过来的值
        原因：JavaScript 中对象和数组是通过引用传入的，在子组件中改变这个对象或数组本身
            将会影响到父组件的状态。
    子组件向父组件传值：通过自定义函数 this.$emit('自定义函数名',载荷)
    父组件接受：在标签中注册该事件名，写函数时，载荷作为参数传进来
 */
    export default {
        // props:['goodsId','count'],
        props:{
            goodsId:{Type: String, required: true},
            // default：默认值
            count:{ Type:Number, default:1}
        },
        data(){
            // 定义一个变量保存数量，方便操作
            return{
                initCount:0
            }  
        },
        created(){
            this.initCount = this.count
        },
        methods:{
            // 
            subCount(){
                if(this.initCount===1){
                    return
                }else{
                    this.initCount--
                }
                // 数据发生变化，需要重新调用函数
                this.notify()
            },
            addCount(){
                this.initCount++
                // 数据发生变化，需要重新调用函数
                this.notify()
            },
            notify(){
                this.$emit('goodsCountChange',{
                    goodsId:this.goodsId,
                    count:this.initCount
                })
            }
        }
    }
</script>