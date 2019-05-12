<template>
    <transition name="fade" mode="out-in">
        <span :class="getCls()">
            <slot></slot>
            <i 
            v-if="close" 
            class="mintui mintui-field-error" 
            @click="$emit('close')">
            </i>
        </span>
    </transition>
</template>

<script>
export default {
  name: "Tag",
  props:{
      close:{
          type:Boolean,
          default:false
      },
      type:{
          type:String,
          default:'primary'
      },
      size:{
          type:String,
          default:'default'
      }
  },
  methods:{
      getCls(){
          return {
              [`fy-tag ${this.type}-color-bg`]:true,
              'fy-tag-small':this.size==='small'
          }
      }
  }
};
</script>
<style lang="less">
.fy-tag{
    padding: 0.1rem 0.15rem;
    font-size: 0.26rem;
    position:relative;
    line-height: 1;
    i.mintui-field-error{
        opacity:1;
        font-size:0.26rem;
        transform: scale(1.2);
        position: absolute;
        right: -0.12rem;
        top: -0.02rem;
    }
}
.fy-tag-small{
    padding: 0.05rem 0.1rem;
    font-size: 0.24rem;
}
</style>
