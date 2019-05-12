<template>
    <div class="index">
        <mt-loadmore style="min-height:100%" :top-method="loadTop" ref="loadmore">
            <!-- 头部 -->
            <router-link :to="{name: 'UserInfo'}" class="header">
                <span class="imgSet" :style="{backgroundImage:'url('+(imgUrl)+')' ,
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition:'center'}">
                </span>
                <div class="textHeader">
                    <p class="textHeader1">{{realName?realName:'未登录'}}</p>
                    <p class="textHeader2">
                        <span>今日收益：</span>
                        <span>{{dayMoney}}</span>
                        <!-- <AnimateNumber class="bigNumber" :value="dayMoney" /> -->
                        元
                    </p>
                    <!-- <p class="textHeader3">
                        <span>今日退款：</span>
                        <AnimateNumber class="bigNumber" :value="todayRefund" />
                        元
                    </p> -->
                    <p class="textHeader3">
                        <span>在线设备：</span>
                        <span>{{onlineTerm}}</span>
                        <!-- <AnimateNumber class="bigNumber" :value="onlineTerm" /> -->
                        <i>/</i>
                        <!-- <AnimateNumber class="bigNumber" :value="totalTerm" /> -->
                        <span>{{totalTerm}}</span>
                    </p>
                </div>
            </router-link>
            <div class="menuList">
                <router-link :to="{name: 'Place'}" class="menu">
                    <img action="场所" src="../../../static/imgs/icon_place.png">
                    <p>场所</p>
                </router-link>
                <router-link v-if="user != '2'" :to="{name: 'Terminal'}" class="menu">
                    <img action="终端" src="../../../static/imgs/icon_terminal.png">
                    <p>终端</p>
                </router-link>
                <router-link v-if="user == '2'" :to="{name: 'PartnerTerminal'}" class="menu">
                    <img action="终端" src="../../../static/imgs/icon_terminal.png">
                    <p>终端</p>
                </router-link>
                <router-link :to="{name: 'InCome'}" @click="removeSet()" class="menu">
                    <img action="统计" src="../../../static/imgs/icon_income.png">
                    <p>统计</p>
                </router-link>
                  <router-link :to="{name:'NewIncome'}" class="menu">
                    <img action="收益" src="../../../static/imgs_new/icon_option.png">
                    <p>收益</p>
                </router-link>
               
            </div>
            <div class="menuList">
                 <router-link :to="{name: 'Order'}" class="menu">
                    <img action="订单" src="../../../static/imgs_new/icon_order.png">
                    <p>订单</p>
                </router-link>
                <router-link :to="{name: 'UserManage'}" class="menu">
                    <img action="用户" src="../../../static/imgs/icon_user.png">
                    <p>成员</p>
                </router-link>

                <!-- <router-link :to="{name:'News'}" class="menu">
                    <img action="用户" src="../../../static/imgs_new/icon_news.png">
                    <p>消息</p>
                </router-link>  -->
            </div>
        </mt-loadmore>
    </div>
</template>

<script src="./script.js">
</script>

<style  lang="less">
@import "./index";
</style>
