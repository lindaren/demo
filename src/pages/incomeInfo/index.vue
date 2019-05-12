<template>
    <div class="order">
        <p class="allCount">
            <span>{{date}}</span>
            <span class="redT"><span class="fy-number" style="opacity: 1;">{{totalIncome | fixedTwo}}</span>
                <i class="smallT">元</i>
            </span>
        </p>
        <mt-loadmore 
        infinite-scroll-disabled="loading" 
        v-infinite-scroll="more" 
        infinite-scroll-distance="50"
        :top-method="loadTop" 
        :bottom-method="loadBottom" 
        :bottom-all-loaded="allLoaded" 
        :auto-fill="false" 
        ref="loadmore">
            <ul class="listBox">
                <li class="linkBox samllHeight" v-for="(item,index) in data" :key="index">
                    <div>
                        <p><i>{{item.comAddr}}</i> <i class="overText">{{item.placeName}}</i></p>
                    </div>
                    <p class="setTextL"><i class="redNum">{{item.income}}</i>元</p>
                </li>

            </ul>
        </mt-loadmore>
        <p v-if='allLoaded' class='loading'>
            全部数据已加载完毕
        </p>
        <div class="noData" v-show="showError">
            <img src="../../../static/imgs/not-data.svg" alt="">
            <p>暂无数据</p>
        </div>
    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
    @import "../order/index";
    @import "./index";
    @import "../home/index";
</style>