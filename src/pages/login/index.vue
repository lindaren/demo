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
                        <span class="input-label">姓 名</span>
                        <input type="text" v-model="username" />
                    </div>
                    <div class="input-group">
                        <span class="input-label">手 机</span>
                        <input maxlength="11" v-model="phone" />
                    </div>
                </form>
                <div class="confirm-btn" @click="bindWx">
                    <span>确认绑定</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./script.js">
</script>

<style lang="less">
@import "./index.less";
</style>
