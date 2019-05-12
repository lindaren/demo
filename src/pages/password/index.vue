<template>
    <div class="password">
        <!-- 修改密码 -->
        <Input class="borderSetLight" label="旧密码" v-show="!Password" placeholder="请输入旧密码" type="password" v-model.trim="data.oldPwd"></Input>
        <Input class="marginSet borderSetLight" v-show="!Password" label="新密码" placeholder="请输入新密码" type="password" v-model.trim="data.newPwd"></Input>
        <!-- 重置密码 -->
        <Input class="borderSetLight" label="新密码" placeholder="请输入新密码" type="password" v-show="Password" v-model.trim="data.newPwd"></Input>
        <Input class="marginSet borderSetLight" label="确认密码" placeholder="请输入确认密码" v-show="Password" type="password" v-model.trim="data.confirmPwd"></Input>
        <mt-button class="footer-button no-select" v-show="!Password" type="primary" @click="changePwd">确定</mt-button>
        <mt-button class="footer-button no-select" v-show="Password" type="primary" @click="changeRePwd">确定</mt-button>
    </div>
</template>
<script src="./script.js">
</script>  
<style lang="less">
@import "./index.less";
</style>
