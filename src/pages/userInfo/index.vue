<template>
    <div class="userInfo">
        <ul class="listBox">
            <li>
                <span class="titleColor">姓 名</span>
                <span class="address">{{username}}</span>
            </li>
            <li>
                <span class="titleColor">联系方式</span>
                <span>{{phone}}</span>
            </li>
            <li>
                <router-link :to="{name: 'Code'}">
                <span class="titleColor">我的二维码</span>
                <p class="codeBox">
                    <img class="getcode" src="../../../static/imgs/code.svg" alt="二维码">
                    <i class="arrowhead"></i>
                </p>
                </router-link>
            </li>
            <!-- <li>
                <span class="titleColor">用户类型</span>
                <span>{{userPropName}}</span>
            </li> -->
            <li>
                <router-link :to="{name: 'Password'}">
                <span class="titleColor">修改密码</span>
                <p class="codeBox">
                    <i class="arrowhead"></i>
                </p>
                </router-link>
            </li>
            <li>
                <span class="titleColor">注册时间</span>
                <span>{{ct}}</span>
            </li>
        </ul>
        <div class="loginOut red borderSetLight" @click="loginOut">退出登录</div>
    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
@import "./index";
</style>
