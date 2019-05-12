<template>
    <div class="code">
        <div class="whiteBox">
            <mt-radio v-model="userProp" :options="options" v-if="users.data.userProp!=9">
            </mt-radio>
            <img class="codeImg" :src='data' />
        </div>
    </div>
</template>

<script src="./script.js">
</script>

<style lang="less">
@import "./index";
</style>
