// 入口文件
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//  注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//localStorage.clear()
//   每次刚进入网站，肯定会调用 main.js,在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')
//console.log(car)
var store = new Vuex.Store({
  state: {    //  this.$store.state
    car: car // 将 购物车中商品的数据，用一个数组存储起来，在car数组中存储一些商品的对象，咱们可以暂
    //时将这个商品对象，设计成这个样子  
    // {id:商品的id，count：要购买的数量，price，商品的单价，selected：false}
  },
  mutations: {   // this.$store.commit('方法名称'，‘按需传递唯一的参数’)
    addToCar(state, goodsinfo) {
      // 点击加入购物车，将商品信息保存到store中的car上
      //  1.如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
      // 2. 如果没有，就直接把商品数据，push到car中

      //  在购物车中，没有找到对应的商品
      var flag = false
      if(state.car.lenght==0){
        state.car.push(goodsinfo)
      }else{
        state.car.some(item => {
          if (item.id == goodsinfo.id) {
            item.count += parseInt(goodsinfo.count)
            flag = true
            return true
          }
        })
        if (!flag) {
          state.car.push(goodsinfo)
        }
      }
    
      //   当更新 car 之后，把car 数组存储到本地的localStorage中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    updateGoodsInfo(state, goodsinfo) {
      //  修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //  当修改完商品的数量，把最新的购物车数据保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))

    },
    removeFormCar(state, id) {
      // 根据id，从store中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true
        }
      })
      //  将删除完毕后的最新的购物车数据同步到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      //  把最新的所有购物车状态保存到本地中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {   // this.store.getters
    //  相当于计算属性，也相当于filters
    getAllCount(state) {
      var c = 0
     if(state.car.lenght==0){
       return c
     }else{
      state.car.forEach(item => {
        c += item.count
      })
      return c
     }
      // for (item in state.car) {
      //   c += item.count
      // }
      
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodscountAmount(state) {
      var o = {
        count: 0,     //  勾选的数量
        amount: 0  //勾选的总价
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})






// 导入格式化时间插件
import moment from 'moment'
//  定义全局的过滤器
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})


//2.1 导入vue-resource
import VueResource from 'vue-resource'
//2.2 安装 vue-resource
Vue.use(VueResource)
//  设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据为json格式
Vue.http.options.emulateJSON = true

// 按需导入mint-ui中的组件
// import { Header,Swipe,SwipeItem ,Button ,Lazyload} from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//  安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


// 导入MUI的样式
import './lib/mui/css/mui.min.css'
//导入MUI扩展图标样式
import './lib/mui/fonts/mui-icons-extra.ttf'
import './lib/mui/css/icons-extra.css'
//1.3 导入自己的router.js模块
import router from './router.js'


//  导入APP组件
import app from './App.vue'



var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,        // 1.4 挂载路由对象到VM上
  store//   挂载store 状态管理对象
})
