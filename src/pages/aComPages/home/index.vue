<template>
    <div class="index">
        <mt-loadmore style="min-height:100%" :top-method="loadTop" ref="loadmore">
            <!-- 头部 -->
            <router-link :to="{name: 'UserInfo'}" class="header_c">
                <span class="imgSet" :style="{backgroundImage:'url('+(imgUrl)+')' ,
                    backgroundRepeat:'no-repeat',
                    backgroundSize:'cover',
                    backgroundPosition:'center'}">
                </span>
                <p class="textHeader">{{realName?realName:'未登录'}}</p>
            </router-link>
            <!-- 收益 -->
            <div class="inCome" v-if="isHome">
                <!-- <div class="toSetFlex">
                    <div>
                        <p class="incomeTitle">本周累计收益</p>
                        <p class="bigMoney">
                            <AnimateNumber class="bigNumber" :value="weekMoney" />
                            <i class="smallMoney">.{{weekMoneyPoint}}元</i>
                        </p>
                    </div>
                    <div class="line"></div>
                </div> -->
                <div class="toSetFlex">
                    <div>
                        <p class="incomeTitle">昨日收益</p>
                        <p class="bigMoney">
                            <!-- <AnimateNumber class="bigNumber" :value="dayMoney" /> -->
                            <span class="bigNumber">{{dayMoney}}</span>
                            <i class="smallMoney">.{{dayMoneyPoint}}元</i>
                        </p>
                    </div>
                    <div class="line"></div>
                </div>
                <div class="toSetFlex">
                    <div>
                        <p class="incomeTitle">本月收益</p>
                        <p class="bigMoney">
                            <!-- <AnimateNumber class="bigNumber" :value="monthMoney" /> -->
                            <span class="bigNumber">{{monthMoney}}</span>
                            <i class="smallMoney">.{{monthMoneyPoint}}元</i>
                        </p>
                    </div>
                </div>
            </div>
            <!-- 灰色间隔 -->
            <div class="space" v-if="isHome"></div>
            <!-- 菜单 -->
            <div class="menuList">
                <router-link :key="index" v-for="(item,index) in menuList" :to="{name:item.route}" class="menu" v-if="isMenu(item.name)">
                    <img :action="item.title" :src="item.src">
                    <p>{{item.title}}</p>
                </router-link>
            </div>
            <!-- 最新订单头部 -->
            <div class="orderHeader">
                <img src="../../../../static/imgs/icon_new_order.png">
                <span class="text no-select">最新订单</span>
            </div>
            <!-- 最近订单具体内容 -->
            <NotDataTip :show="orders.length==0&&(isLoading===false)" />
            <ul class="orderBody">
                <li v-for="item in orders" :key="item.id">
                    <div>
                        <p class="placeTerm">
                            <span>{{item.comAddr}}</span>
                            <span class="overText">{{item.placeName}}</span>
                        </p>
                        <p class="timeText">{{item.pay_time}}</p>
                    </div>
                    <div>
                        <p class="moneyRed">{{item.fee|fixedTwo(2)}}
                            <i class="smallText">元</i>
                        </p>
                        <img v-if="item.orderStatus==2" class="refund" src="../../../../static/imgs/refund.png" />
                    </div>
                </li>
            </ul>
            <!-- loaddingBar -->
            <LoadingBox v-if="isLoading" :rows="5" />
        </mt-loadmore>
    </div>
</template>

<script src="./script.js">
</script>

<style  lang="less">
@import "../../home/index";
</style>
