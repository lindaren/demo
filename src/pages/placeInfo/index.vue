<template>
    <div class="placeInfo">
        <p class="basic">基本信息</p>
        <ul class="listBox borderTopB">
            <li>
                <span class="titleColor">场所编号</span>
                <span>{{baseInfo.placeId}}</span>
            </li>
            <li>
                <span class="titleColor">场所名称</span>
                <span class="address">{{baseInfo.placeName}}</span>
            </li>
            <li>
                <span class="titleColor">场所类型</span>
                <span>{{baseInfo.placeType}}</span>
            </li>
            <li>
                <span class="titleColor">扫码套餐</span>
                <span>{{baseInfo.planName}}</span>
            </li>
            <li>
                <span class="titleColor">实投台数</span>
                <span>{{baseInfo.termCount}}台</span>
            </li>
            <li>
                <span class="titleColor">详细地址</span>
                <span class="address">{{baseInfo.address}}</span>
            </li>
            <li>
                <span class="titleColor">创建日期</span>
                <span>{{baseInfo.createTime}}</span>
            </li>
            <li @click="toTerPage">
                <span class="titleColor">终端列表</span>
                <i class="arrowhead"></i>
            </li>
            <!-- <div class="info">合同信息</div>
            <li>
                <span class="titleColor">实投数量</span>
                <span class="address">{{contract.termCount}}台</span>
            </li>
            <li>
                <span class="titleColor">合同数量</span>
                <span class="address">{{contract.signCount}}台</span>
            </li>
            <li>
                <span class="titleColor">结算方式</span>
                <span class="address">{{contract.billType}}</span>
            </li>
            <li>
                <span class="titleColor">我司分成</span>
                <span class="address">{{contract.rate}}%</span>
            </li>
            <li>
                <span class="titleColor">商家分成</span>
                <span class="address">{{contract.storeRate}}%</span>
            </li>
            <li>
                <span class="titleColor">月租金</span>
                <span class="address">{{contract.rent}}元</span>
            </li> -->
        </ul>
    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
@import "./index";
</style>
