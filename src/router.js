//1.导入vue-router包
import VueRouter from 'vue-router'


// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemmberContainer from './components/tabbar/MemmberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import ShopContainer from './components/tabbar/ShopContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
// import GoodsList from './components/goods/GoodsList.vue'
// import GoodsInfo from './components/goods/GoodsInfo.vue'
// import GoodsDesc from './components/goods/GoodsDesc.vue'
// import GoodsComment from './components/goods/GoodsComment.vue'

//3.创建路由对象
var router = new VueRouter({
  routes: [  // 配置路由规则
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemmberContainer },
    { path: '/search', component: SearchContainer },
    { path: '/shopcar', component: ShopContainer },
    { path: '/home/newlist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photo', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    // { path: '/home/goodslist', component: GoodsList },
    // { path: '/home/goodsinfo/:id', component: GoodsInfo },
    // { path : '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc' },
    // {  path: '/home/goodscomment/:id' ,component:GoodsComment,name:'goodscomment'}

  ],
  linkActiveClass:"mui-active"// 把router-link-active修改为mui-active，覆盖默认的路由高亮的类
})
export default router