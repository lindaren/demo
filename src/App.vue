<template>
    <div id="app">
        <vue-progress-bar></vue-progress-bar>
        <div v-wechat-title="$route.meta.title" img-set="static/imgs/t.png"></div>
        <keep-alive :include="cacheStr">
            <router-view>
            </router-view>
        </keep-alive>
    </div>
</template>
<script>
import { mapState } from "vuex";
import {addClass,removeClass} from '@/utils/dom'
export default {
  name: "app",
  computed: mapState({
    progress: state => state.loading.progress,
    error: state => state.loading.error,
    direction: state => state.loading.direction,
    isScrollHide:state => state.loading.isScrollHide,
    cacheStr(state) {
      return state.cache.cacheList.join(",");
    }
  }),
  watch:{
      isScrollHide(val){
          if(val===true){
              this.$nextTick(()=>{
                  let body = document.body;
                  let html = document.documentElement;
                  addClass(body,'height-auto');
                  addClass(html,'height-auto scroll-hide');
              });
          }else{
              this.$nextTick(()=>{
                  let body = document.body;
                  let html = document.documentElement;
                  removeClass(body,'height-auto');
                  removeClass(html,'height-auto scroll-hide');
              });
          }
      }
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach(this.beforeEach);
    this.$router.afterEach(this.afterEach);
  },
  mounted() {
    this.$Progress.finish();
  },
  methods: {
    beforeEach(to, from, next) {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    },
    afterEach() {
      setTimeout(() => this.$Progress.finish(), 300);
    }
  }
};
</script>
<style lang="less">
@import './styles/index.less';
</style>
