<template>
    <div class="number-grow-warp">
        <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value"></span>
    </div>
</template>
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number
    }
  },
  watch: {
    value: {
      handler: function(val, oldVal) {
        this.value = val;
        this.numberGrow(this.$refs.numberGrow);
      },
      immediate: true
    }
  },
  methods: {
    numberGrow(ele) {
      let _this = this;
      let step = 1;
      let current = 0;
      let start = 0;
      let t = setInterval(function() {
        start += step;
        if (start > _this.value) {
          clearInterval(t);
          start = _this.value;
          t = null;
        }
        if (current === start) {
          return;
        }
        current = start;
        if (ele) {
          ele.innerHTML = current
            .toString()
            .replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
        }
      }, 10);
    }
  },
  mounted() {
    this.numberGrow(this.$refs.numberGrow);
  }
};
</script>
<style>
.number-grow-warp {
  transform: translateZ(0);
  display: inline-block;
}
</style>