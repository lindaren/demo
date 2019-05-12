<template>
    <div class="box-wrap">
        <Input label="用户名" class="border-bottom"  v-required placeholder="请输入用户名" v-model="username"></Input>
        <Cell label="用户类型" v-model="userType" required :list="userTypeList"></Cell>
        <Cell label="合伙类型" v-if="users.data.userProp==2||users.data.userProp==4" required v-model="userProp" :list="[{id:'2',name:'合伙人'},{id:'4',name:'代理自购'}]"></Cell>
        <Input label="手机号" class="border-bottom"  v-required placeholder="请输入手机号" type="tel" v-model="phone"></Input>
        <mt-button class="footer-button no-select" type="primary" @click="submit">提交</mt-button>
    </div>
</template>
<script src="./script.js">
</script>  
<style lang="less">
@import "./index.less";
</style>
