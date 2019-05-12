<template>
    <div class="fy-button-wrap" @click="clickHandler">
        <img class="no-select" :id="flag?'rotate':''"  ref="load" src="../../static/imgs/refresh.png" alt="">
    </div>
</template>

<script>
// import Velocity from "velocity-animate";

export default {
  name: "RefreshButton",
  props: {
    space: {
      type: Number,
      default: 60000
    },
    errorText: {
      type: String,
      default: "点击频繁，请稍后再试"
    }
  },
  data() {
    return {
      rotateZ: 0,
      time: 0,
      flag:false
    };
  },
  methods: {
    /**外部调用 */
    triggerClick(){
        this.loadAnimate();
        this.$emit("click");
    },
    clickHandler() {
      if (this.isTimeoutClick()) {
        this.loadAnimate();
        this.$emit("click");
      }
    },
    isTimeoutClick() {
      let currTime = new Date().getTime();
      if (currTime - this.time >= this.space) {
        this.time = currTime;
        return true;
      }
      this.$Toast(this.errorText);
      this.flag = false;
      return false;
    },
    loadAnimate() {
      this.rotateZ += 360 * 2;
      this.flag = true;
    //   Velocity(
    //     this.$refs.load,
    //     {
    //       rotateZ: this.rotateZ
    //     },
    //     {
    //       duration: 1000
    //     }
    //   );
    }
  }
};
</script>

<style lang="less">
.fy-button-wrap {
  position: fixed;
  bottom: 1.2rem;
  right: 30px;
  width: 1rem;
  height: 1rem;
  background-color: rgba(255,255,255,0.85);
  border-radius: 0.5rem;
  box-shadow: 0 1px 8px #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 80%;
    height: 80%;
    opacity: 0.8;
  }
}
#rotate{
      transform: rotate(-180deg) ;
      transition:all 0.1s linear;
}
</style>
