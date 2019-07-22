// 入口文件
import Vue from 'vue'
//1.1 导入路由的包
import VueRouter from 'vue-router'
//1.2 安装路由
Vue.use(VueRouter)

//  注册 vuex


//   每次刚进入网站，肯定会调用 main.js,在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到store中








// 导入格式化时间插件

//  定义全局的过滤器



//2.1 导入vue-resource

//2.2 安装 vue-resource

//  设置请求的根路径

// 全局设置 post 时候表单数据为json格式


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
  router        // 1.4 挂载路由对象到VM上
   //   挂载store 状态管理对象
})
