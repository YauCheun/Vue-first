<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateformat}}</span>
      <span>点击： {{newsinfo.click}}次</span>
    </p>
    <hr />
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      newsinfo: {},
      id: this.$route.params.id
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
        this.$http.get('api/getnew/'+this.id).then(result=>{
            if(result.body.status===0){
                this.newsinfo=result.body.message[0]
                console.log(this.newsinfo)
            }else{
                Toast('获取新闻详情失败')
            }
        })
    }
  },
  components:{
     "comment-box":comment
  }
};
</script>

<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
