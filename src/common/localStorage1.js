const KEY = 'GOODS'

const getLocalGoods = () =>{   
    return JSON.parse(localStorage.getItem(KEY) || '{}')
}
    
const getTotalGoods = () =>{
    const localgoods = getLocalGoods()
    let totalGoods = 0
    for(var key in localgoods)
    totalGoods += localgoods[key]
    return totalGoods
}
const addLocalGoods = goods =>{
    const localgoods = getLocalGoods()
    if(localgoods[goods.goodsId]){
        localgoods[goods.goodsId] += goods.count 
    }else{
        localgoods[goods.goodsId] = goods.count
    }

    localStorage.setItem(KEY,JSON.stringify(localgoods))
    return getTotalGoods()
}

export {
    addLocalGoods
}