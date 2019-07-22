<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item ',item.id==0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.title"
            @click="getimages(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表区域 -->
     <ul class="photo-list">
      <routerLink v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url" />
        <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </routerLink>
    </ul>
  </div>
</template>


<script>
// 1. 导入mui的js文件
import mui from "../../lib/mui/js/mui.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      cates: [],
      list:[]
    };
  },
  created() {
      this.getCategory(),
      this.getimages(0)
  },
  mounted() {
    //  当组件中的DOM结构被渲染好并放到页面之后，会执行这个钩子函数
    //  如果要操作元素了，最好在mounted里面，因为，这时候的DOM元素是最新的
    // 2. 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
        this.$http.get("api/getimgcategory").then(result=>{
            if(result.body.status===0){
                result.body.message.unshift({ title: "全部", id: 0 });
                this.cates=result.body.message
                console.log(result.body.message);

            }else{
                Toast("获取分类数据失败")
            }
        })
    },
    getimages(cateid){
          this.$http.get("api/getimages/"+cateid).then(result=>{
            if(result.body.status===0){              
                this.list=result.body.message
            }else{
                Toast("获取分类数据失败")
            }
        })
    }
  }
};
</script>


<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      max-height: 84px;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
