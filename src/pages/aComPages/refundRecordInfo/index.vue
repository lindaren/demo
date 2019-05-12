<template>
    <div class="boxInfo">
        <div class="headers">
            <p class="placeName">{{item.placeName?item.placeName:""}}{{item.name?"-"+item.name:""}}</p>
            <p>
                <Tag type="error" slot="rightTop">{{item.refundType}}</Tag>
            </p>
        </div>
        <TimeStep class="marginBottom borderSet" header="记录" name="statusName" describe="note" time="ct" :options="orderList"/>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">设备编号</span>
                <span>{{item.termId}}</span>
            </li>
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
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
                <span class="titleColor">退款订单号</span>
                <span>{{item.refund_id}}</span>
            </li>
            <li>
                <span class="titleColor">退款渠道</span>
                <span>{{item.refund_way}}</span>
            </li>
            <li>
                <span class="titleColor">退款金额</span>
                <span class="gayNum"><span class="warning-color">{{item.fee|fixedTwo(2)}}</span>元</span>
            </li>
            <li>
                <span class="titleColor">退款人</span>
                <span>{{item.creator}}</span>
            </li>
            <li>
                <span class="titleColor">退款时间</span>
                <span>{{item.refund_time}}</span>
            </li>
        </ul>
    </div>
</template>
<script src="./script.js">
</script>
