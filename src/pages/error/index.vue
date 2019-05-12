<template>
    <div class="error">
        <p class="text">{{errors[status]}}</p>
        <p v-if="isHome" @click="toPage" class="text" :style="{bottom:'2rem'}">去首页看看</p>
        <a v-if="isLogin" :href="url"  class="text" :style="{bottom:'4rem'}">重新登录</a>
    </div>
</template>
<script src="./script.js">
</script>

<style scoped lang="less">
@import "./index";
</style>
