<template>
    <div class="fy-saerch mint-search" >
        <div class="mint-searchbar">
            <div class="mint-searchbar-inner">
                <i class="mintui mintui-search"></i>
                <form class="search-form" @submit.prevent="$emit('submit')">
                    <input 
                        ref="input" 
                        @focus="visible=true" 
                        type="search" 
                        v-model="currentValue" 
                        :placeholder="placeholder" 
                        class="mint-searchbar-core">
                </form>
                <i 
                v-show="visible&&currentValue.length>0" 
                @click="clear" 
                class="mintui mintui-field-error">
                </i>
            </div>
            <a 
                class="mint-searchbar-cancel" 
                @click="$emit('cancel')" 
                v-text="cancelText">
            </a>
        </div>
        <div 
        class="mint-search-list" 
        v-show="show || currentValue">
            <div class="mint-search-list-warp">
                <slot>
                    <div 
                        class="fy-search-cell" 
                        @click="$emit('itemClick',item)" 
                        v-for="(item, index) in result" 
                        :key="index" 
                        :title="item[prop.label]" >
                        <div class="fy-search-cell-body">
                            {{item[prop.label]}}
                        </div>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
import XCell from "mint-ui/packages/cell/index.js";

export default {
  name: "Search",
  props: {
    value: {
      type: String,
      default: ""
    },
    autofocus: Boolean,
    show: Boolean,
    cancelText: {
      default: "取消"
    },
    placeholder: {
      default: "搜索"
    },
    result: {
      type: Array,
      default() {
        return [];
      }
    },
    prop:{
        type:Object,
        default(){
            return {
                label:'name'
            }
        }
    }
  },
  data() {
    return {
      visible: false,
      currentValue: this.value
    };
  },
  components: { XCell },
  watch: {
    currentValue(val) {
      this.$emit("input", val);
      this.$emit("change",val);
    },
    value(val) {
      this.currentValue = val;
    }
  },
  mounted() {
    this.autofocus && this.$refs.input.focus();
  },
  methods: {
    clear() {
      this.$emit("input", "");
      this.$refs.input && this.$refs.input.focus();
    }
  }
};
</script>
<style lang="less" scoped>
@import "./SearchInput/index.less";
</style>
