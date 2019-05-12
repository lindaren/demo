<template>
  <div class="fy-search-bar" @click="clickHandler">
      <div class="fy-search-wrap">
          <i class="mintui mintui-search"></i> {{text}}
      </div>
  </div>
</template>

<script>

export default {
    name:'SearchBar',
    props:{
        text:{
            type:String
        }
    },
    methods:{
        clickHandler(){
            this.$emit('click');
        }
    }
}
</script>

<style lang="less">
    .fy-search-bar{
        height: 0.88rem;
        padding: 0.16rem 0.2rem;
        background-color: #efeff4;
        position: relative;
        z-index: 1;
        .fy-search-wrap{
            background-color: #fff;
            border-radius: 2px;
            height: 100%;
            padding:0.08rem 0.12rem; 
            font-size: 0.24rem;
            color: #444;
            display: flex;
            align-items: center;
        }
        .mintui-search{
            font-size: 0.28rem;
        }
    }
</style>
