<template>
    <div class="boxInfo">
        <div class="headers">
            <p class="placeName">{{item.placeName?item.placeName:""}}{{item.name?"-"+item.name:""}}</p>
            <p>
                <Tag :type=" item.status=='离线'?'error':'primary'" slot="rightTop">{{item.status}}</Tag>
            </p>
        </div>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">前置机编号</span>
                <span>{{item.serverId}}</span>
            </li>
            <li>
                <span class="titleColor">终端编号</span>
                <span>{{item.comAddr}}</span>
            </li>
            <li>
                <span class="titleColor">投币底数</span>
                <span>{{item.coinBase}}</span>
            </li>
            <li>
                <span class="titleColor">故障代码</span>
                <span>{{item.errCode}}</span>
            </li>
            <li>
                <span class="titleColor">信号强度</span>
                <span>{{item.sign}}</span>
            </li>
            <li>
                <span class="titleColor">版本号</span>
                <span>{{item.version}}</span>
            </li>
            <li>
                <span class="titleColor">最后一次心跳时间</span>
                <span>{{item.lastTime}}</span>
            </li>
            <li>
                <span class="titleColor">设备编号</span>
                <span>{{item.id}}</span>
            </li>
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span class="titleColor">经纬度</span>
                <span>{{item.lonlat}}</span>
            </li>
            <li>
                <span class="titleColor">创建日期</span>
                <span>{{item.ct}}</span>
            </li>
            <li>
                <span class="titleColor">投放日期</span>
                <span>{{item.rTime?item.rTime:""}}</span>
            </li>
        </ul>
    </div>
</template>
<script src="./script.js">
</script>
