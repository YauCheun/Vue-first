<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      value="1"
      @change="countChanged"
      ref="numbox"
    />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  // data(){
  //     return{}
  // }
  mounted() {
    mui(".mui-numbox").numbox();
  },
  methods:{
      countChanged(){
        this.$emit("getcount",parseInt(this.$refs.numbox.value))
        console.log(this)
      }
  },
  props:["max"],
  watch:{
      // 属性监听
      'max': function(newVal,oldVal){
          mui(".mui-numbox").numbox().setOption('max',newVal)
      }
  }
};
</script>


<style lang="scss" scoped>
</style>
