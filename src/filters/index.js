/**
 *  创建全局过滤器：Vue.filter('过滤器名字',(value,format)=>{return xxx})
 *  参数一value: 过滤器函数总接收表达式的值  format:格式化样式
 *  moment日期处理数据库的使用：moment(value).format(format)
 * 
 * 
 * */ 

import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
    // moment(被格式的数据).format(格式化的样式)
    return moment(input).format(formatStr)
})