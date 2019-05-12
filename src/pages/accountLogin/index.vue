<template>
    <div class="page container login">
        <div ref="logo" class="imgBox">
            <img class="title" src="http://ossadv.fjminben.com/res/title.1538a57.png">
        </div>
        <div ref="content" class="content">
            <div class="hd" style="transform:rotateZ(0deg);">
                <img class="logo" src="http://ossadv.fjminben.com/res/logo.c4be04e.png">
                <img class="wave behind-wave" src="http://ossadv.fjminben.com/res/wave.dec4420.png">
                <img class="wave wave-bg" src="http://ossadv.fjminben.com/res/wave.dec4420.png">
            </div>
            <div class="bd">
                <form class="login-form">
                    <div class="input-group" v-show="showFirst">
                        <span class="input-label">手 机</span>
                        <input placeholder="请输入手机号" maxlength="11" type="text" v-model="phone" />
                    </div>
                    <div class="input-group" v-show="showFirst">
                        <span class="input-label">密 码</span>
                        <input placeholder="请输入密码" :type="pwdType" v-model="password" />
                        <img @click="eyeClick" class="eye" :src="eyeUrl" alt="">
                    </div>

                    <div class="input-group" v-show="showSend">
                        <span class="input-label">手机号</span>
                        <input placeholder="请输入手机号"  maxlength="11" type="text" v-model="phoneCode" />
                       
                    </div>
                    <div class="input-group" v-show="showSend">
                        
                        <span class="input-label">验证码</span>
                        <input placeholder="请输入验证码" class="getSend" maxlength="11" type="text" v-model="verification" />
                         <span :class="timeId=='1' ? 'get-send' : 'get-time' " @click="getSend">{{time}}</span>
                    </div>

                    <p class="tip-tip" v-show="showSend" @click="returnPa">提示：若记起密码，点击返回<span style="color:#689DF7">[登录界面]</span></p>
                    <p class="tip-tip" v-show="showFirst" @click="resetPassword">提示：若忘记密码,点击<span style="color:#689DF7">[重置密码]</span></p>
                </form>

                <div class="confirm-btn" @click="bindWx" v-show="showFirst">
                    <mt-spinner class="sp" :size="18" v-if="$store.state.transition.isLogin" :type="3"></mt-spinner>
                    <span :class="$store.state.transition.isLogin?'':'backgrousa'">登 录</span>
                </div>
                <div class="confirm-btn" v-show="showSend" @click="getVerify">
                    <mt-spinner class="sp" :size="18" v-if="$store.state.transition.isLogin" :type="3"></mt-spinner>
                    <span>立即验证</span>
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
