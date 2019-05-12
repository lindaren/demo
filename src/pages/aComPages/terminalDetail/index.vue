<template>
    <div class="boxInfo">
        <div class="headers">
            <p class="placeName">{{item.pname}}{{item.name?'-'+item.name:''}}</p>
        </div>
        <ul class="listBox marginBottom borderSet">
            <li>
                <span class="titleColor">终端编号</span>
                <span :class="dlCls(item)">{{item.comAddr}}</span>
            </li>
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span class="titleColor">扫码套餐</span>
                <span>{{item.planName}}</span>
            </li>
            <li>
                <span class="titleColor">套餐详情</span>
                <span>{{item.planInfo}}</span>
            </li>
        </ul>
        <ul class="listBox marginBottom borderSet">
            <li>
                <span class="titleColor">场所类型</span>
                <span>{{item.placeType}}</span>
            </li>
            <li>
                <span class="titleColor">结算方式</span>
                <span>{{item.billType}}</span>
            </li>
            <li>
                <span class="titleColor">流量卡号</span>
                <span>{{item.phone}}</span>
            </li>
            <li>
                <span class="titleColor">投放时间</span>
                <span>{{item.r_time}}</span>
            </li>
            <li>
                <span class="titleColor">最近登录时间</span>
                <span>{{item.ft_login_time}}</span>
            </li>
            <li>
                <span class="titleColor">最后一次心跳时间</span>
                <span>{{item.last_time}}</span>
            </li>
        </ul>
        <ul class="listBox marginBottom borderSet">
            <li>
                <span class="titleColor">设备编号</span>
                <span>{{item.id}}</span>
            </li>
            <li>
                <span class="titleColor">资产编号</span>
                <span>{{item.dfNo}}</span>
            </li>
            <li>
                <span class="titleColor">机型</span>
                <span>{{item.type}}</span>
            </li>
            <li>
                <span class="titleColor">网络服务商</span>
                <span>{{item.simType}}</span>
            </li>
            <li>
                <span class="titleColor">接入方式</span>
                <span>{{item.network}}</span>
            </li>
            <li>
                <span class="titleColor">终端版本</span>
                <span>{{item.version}}</span>
            </li>
            <li>
                <span class="titleColor">当前投币底数</span>
                <span>{{ item.coinBase!=0?(+item.coinBase).toFixed(2)+"元":item.coinBase }}</span>
            </li>

        </ul>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">撤机时间</span>
                <span>{{item.rm_time}}</span>
            </li>
            <li>
                <span class="titleColor">备注</span>
                <span>{{item.note}}</span>
            </li>
        </ul>
    </div>
</template>

<script src="./script.js">
</script>