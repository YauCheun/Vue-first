<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotu="this.lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="p">
            市场价 :
            <del>￥{{goodsinfo.market_price}}</del> &nbsp; &nbsp; 销售价:
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车时，拿到选择的数量 -->
            <!-- 1.经过分析发现，按钮属于goodsinfo页面，数字属于numberbox组件 -->
            <!-- 2.由于涉及到了父子组件的嵌套了，所以无法直接在goodsinfo 页面中获取到选中的商品数量值 -->
            <!-- 3.怎么解决这个问题，涉及到了子组件向父组件传值了（事件调用机制） -->
            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header"></div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no}}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateformat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/goodsinfo_numbox.vue";
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      lunbotu: [],
      id: this.$route.params.id,
      goodsinfo: {},
      ballFlag: false,
      selectedcount: 1
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        console.log(this.id);
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = result.body.message;
        }
      });
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        } else {
          Toast("获取商品数据失败");
        }
      });
    },
    getSelectedCount(count) {
      this.selectedcount = count;
    },
     goDesc(id) {
      //  点击使用编程时导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
       
    },
    goComment(id) {
      //  点击跳转到评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      var goodsinfo={
        id:parseInt(this.id),
        count:this.selectedcount,
        price: this.goodsinfo.sell_price,
        selected:true
      };
      console.log(goodsinfo)
       this.$store.commit("addToCar",goodsinfo);
      
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //  小球优化思路：
      // 1.先分析导致动画 不准确的本质原因：我们把 小球最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的滚动距离后，问题就出现了
      // 3. 因此，我们经过分析，得到结论： 不能把位置的横纵坐标直接写死了，而是应该根据不同的情况动态计算这个坐标值
      // 4.经过分析，得出解题思路，先得到 徽标的横纵坐标，在得到小球的横纵坐标，然后让y 值求差，x值也求差，得到的结果，就是横纵坐标要位移的距离
      // 5. 如何获取徽标和小球的位置？？？ domObject.getBoundingClientRect()

      // 获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //  获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>


<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    z-index: 99;
    background-color: red;
    top: 390px;
    left: 151px;
  }
}
</style>
