<template>
    <Search autofocus v-model="value" @change="change" @itemClick="itemClick" @cancel="cancel" placeholder="请输入搜索内容" :result.sync="result">
    </Search>
</template>

<script src="./script.js">
</script>

<style lang="less">
.mint-searchbar {
  padding: 0.16rem 0.2rem;
  .mint-searchbar-inner {
    height: 0.56rem;
    padding: 0.08rem 0.12rem;
    .mintui-search {
      font-size: 0.26rem;
    }
    .mint-searchbar-core {
      font-size: 0.28rem;
    }
  }
  .mint-searchbar-cancel {
    margin-left: 0.2rem;
    font-size: 0.28rem;
  }
}
</style>
