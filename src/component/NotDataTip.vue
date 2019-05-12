<template>
  <div class="fy-notdata-tip" v-show="show">
      <img src="../../static/imgs/not-data.svg" alt="">
      <p>{{msg}}</p>
  </div>
</template>

<script>

export default {
    name:'NotDataTip',
    props:{
        show:{
            type:Boolean,
            default:false
        },
        msg:{
            type:String,
            default:'暂无数据'
        }
    }
}
</script>

<style lang="less">
.fy-notdata-tip{
    width: 100%;
    text-align: center;
    padding: 0.3rem 0;
    background: transparent;
    img{
        width: 35%;
        height: auto;
    }
    p{
        text-align: center;
        font-size: 0.3rem;
        color: rgba(0,0,0,.5);
    }
}
</style>
