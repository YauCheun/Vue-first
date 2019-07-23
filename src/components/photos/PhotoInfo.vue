<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoinfo.add_time | dateformat}}</span>
      <span>点击：{{photoinfo.click}} 次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <vue-preview :slides="list" class="preview-img"></vue-preview>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="this.id"></cmt-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      photoinfo: {},
      list:[],
      id: this.$route.params.id
    };
  },
  created() {
      this.getPhotoInfo()
      this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      });
    },
    getThumbs(){
         this.$http.get("api/getthumimages/" + this.id).then(result => {
             if(result.body.status===0){
                 result.body.message.forEach(item => {
                     item.w=600
                     item.h=400
                     item.msrc=item.src
                 });
                 this.list=  result.body.message
             }else{
                 Toast("获取图片缩略图失败");
             }
         })
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>


<style lang="scss" >
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
.preview-img {
  overflow: hidden;
  figure {
    float: left;
    width: 30%;
    margin: 1.5%;
    img {
      box-shadow: 0 0 8px #999;
      width: 100%;
    }
  }
}
</style>
