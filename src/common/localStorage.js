/**
 *  给store/index.js调用的，包含：新增，修改，删除等方法
 * 
 *  
 *  本地存储存取值的总结：
 *      取值：(由于要进行js操作，所以将json字符串 转成 js对象，
 *              并且进行逻辑或判断，考虑到第一次取值是underfine,会报错)
 *          return JSON.parse(localStorage.getItem(KEY) || '{}')
 *      存值：将js对象转成json字符串,因为本地存储存的就是json字符串形式
 *           localStorage.setItem(KEY,JSON.stringify(localGoods))
 * */ 
// 定义一个key值
    const KEY = "GOODS"
// 获取本地存储
    const getLocalGoods = ()=>{
        // json => js
        // 后面的{}必须要引起来，符合json格式
        return JSON.parse(localStorage.getItem(KEY) || '{}')
        // return (JSON.parse(localStorage.getItem(KEY) )|| '{}')
    }

// 获取总数量
    const getTotalCount = () => {
        // 获取本地存储的对象
        const localGoods = getLocalGoods()
        // 定义一个变量，用来存放总数量
        let totalGoods = 0
        // 遍历本地存储的对象
        for(var key in localGoods)
            // 将对象中的值，累加给总数量
            totalGoods += localGoods[key]
        // 返回总数量
        return totalGoods
    }

//  添加购物车商品
const addLocalGoods = goods =>{
    // 1.先获取到本地存储的对象
    const localGoods = getLocalGoods()
    // 2.判断要添加的商品是否在本地存储中存在
    // 2.1 如果存在，就将商品数量进行累加
    if(localGoods[goods.goodsId]){
        localGoods[goods.goodsId] += goods.count
    // 2.2 如果不存在，就用对象添加属性方法，进行添加
    // obj[key] = value ,当obj中没有key时，就往obj中添加key
    }else{
        localGoods[goods.goodsId] = goods.count
    }

    // 3.将添加后的数据存储到本地存储
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    // 4.将总数量返回
    return getTotalCount()
}

// 更改购物车商品
const updateLocalGoods = goods =>{
    const localGoods = getLocalGoods()
    localGoods[goods.goodsId] = goods.count
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getTotalCount()
}

// 删除购物车商品
const deleteLocalGoods = goodsId =>{
    const localGoods = getLocalGoods()
    delete localGoods[goodsId]
    localStorage.setItem(KEY,JSON.stringify(localGoods))
    return getTotalCount()
}

// 默认导出：export default
// 按需导出 ：export
export {
    addLocalGoods,
    getTotalCount,
    getLocalGoods,
    updateLocalGoods,
    deleteLocalGoods
}