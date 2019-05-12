<template>
    <div class="fy-check-list">
        <span 
            @click="clickItem(item)" 
            :class="{'primary-color-tag-active':currValue==item.id?true:false}" 
            class="primary-color-tag" 
            v-for="(item,index) in list" 
            :key="index">
            {{item.name}}
        </span>
    </div>
</template>

<script>
export default {
  name: "TagList",
  props: {
    value: {
      type: Number
    },
    data: {
      type: Array,
      default: []
    }
  },
  watch: {
    value(val) {
      this.currValue = val;
    }
  },
  computed: {
    list() {
      return this.data;
    }
  },
  created() {
    this.currValue = this.value;
  },
  data() {
    return {
      currValue: ""
    };
  },
  methods: {
    clickItem({ id, name }) {
      if (this.currValue == id) {
        this.currValue = "";
      } else {
        this.currValue = id;
      }
      this.$emit("input", id);
      this.$emit("change", { id, name });
    }
  }
};
</script>

<style lang="less">
.fy-check-list {
  font-size: 0;
  span {
    margin-right: 0.3rem;
  }
}
</style>
