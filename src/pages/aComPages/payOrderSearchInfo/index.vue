<template>
    <div class="boxInfo padding-box-b">
        <div class="headers">
            <p class="placeName">{{item.placeName}}</p>
            <p>
                <Tag :type=" item.orderStatus=='未付款'?'error':'success'" slot="rightTop">{{item.orderStatus}}</Tag>
            </p>
        </div>
        <TimeStep class="marginBottom borderSet" header="记录" name="statusName" describe="note" time="ct" :options="orderList"/>
        <ul class="listBox borderSet marginBottom">
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li v-if="item.wuser">
                <span class="titleColor">白名单</span>
                <span>{{item.wuser}}</span>
            </li>
            <li>
                <span class="titleColor">设备编号</span>
                <span>{{item.termId}}</span>
            </li>
            <li>
                <span class="titleColor">终端编号</span>
                <span>{{item.comAddr}}</span>
            </li>
            <li>
                <span class="titleColor">民本订单号</span>
                <span>{{item.mb_order_id}}</span>
            </li>
            <li>
                <span class="titleColor">支付订单号</span>
                <span>{{item.order_id}}</span>
            </li>
            <li>
                <span class="titleColor">支付渠道</span>
                <span>{{item.pay_way}}</span>
            </li>
            <li>
                <span class="titleColor">支付金额</span>
                <span class="gayNum"><span class="warning-color">{{item.fee|fixedTwo(2)}}</span>元</span>
            </li>
            <li>
                <span class="titleColor">支付时间</span>
                <span>{{item.pay_time}}</span>
            </li>
            <li>
                <span class="titleColor">运行状态</span>
                <span :class="{'warning-color':item.runState!='启动成功','success-color':item.runState=='启动成功'}">{{item.runState}}</span>
            </li>
        </ul>
        <ul class="listBox">
            <li @click="remote" v-if="item.runState=='启动失败'&&userPermission.indexOf('term.remoteButton')>=0" class="no-select">
                <span class="titleColor">远程启动</span>
            </li>
            <li @click="refund" v-if="item.orderStatus!='已退款'&&userPermission.indexOf('term.refundButton')>=0" class="no-select">
                <span class="titleColor">退 款</span>
            </li>
        </ul>
        <FyPopup v-model="isRefund" @confirm="confirm">
            <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
        </FyPopup>
    </div>
</template>
<script src="./script.js">
</script>
