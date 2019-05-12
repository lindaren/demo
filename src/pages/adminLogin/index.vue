<template>
    <div class="page container login">
        <div ref="logo" class="imgBox">
            <img class="title" src="../../../static/imgs/login/title.png">
        </div>
        <div ref="content" class="content">
            <div class="hd" style="transform:rotateZ(0deg);">
                <img class="logo" src="../../../static/imgs/login/logo.png">
                <img class="wave behind-wave" src="../../../static/imgs/login/wave.png">
                <img class="wave wave-bg" src="../../../static/imgs/login/wave.png">
            </div>
            <div class="bd">
                <form class="login-form">
                    <div class="input-group">
                        <span class="input-label">账 号</span>
                        <input placeholder="请输入账号" type="text" v-model="username" />
                    </div>
                    <div class="input-group">
                        <span class="input-label">密 码</span>
                        <input placeholder="请输入密码" :type="pwdType" v-model="password" />
                        <img @click="eyeClick" class="eye" :src="eyeUrl" alt="">
                    </div>
                </form>
                <div class="confirm-btn" @click="bindWx">
                    <mt-spinner class="sp" :size="18" v-if="$store.state.transition.isLogin" :type="3"></mt-spinner>
                    <span>登 录</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./script.js">
</script>

<style lang="less">
@import "../login/index";
</style>
