<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header fixed title="张友的vue项目">
      <div slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </div>
    </mt-header>

    <!-- 中间的路由router-view区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link to="/home" class="mui-tab-item">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link to="/member" class="mui-tab-item">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link to="/shopcar" class="mui-tab-item">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">9</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link to="/search" class="mui-tab-item">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal == "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter{
  opacity: 0;
  transform: translateX(100%)
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;
}
</style>


