<template>
    <div class="boxInfo">
        <div class="headers">
            <p class="placeName">{{item.placeName}}</p>
        </div>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span class="titleColor">设备编号</span>
                <span>{{item.id}}</span>
            </li>
            <li>
                <span class="titleColor">终端编号</span>
                <span>{{item.comAddr}}</span>
            </li>
            <li>
                <span class="titleColor">上次底数</span>
                <span>{{item.coin1}}</span>
            </li>
            <li>
                <span class="titleColor">本次底数</span>
                <span>{{item.coin2}}</span>
            </li>
            <li>
                <span class="titleColor">投币金额</span>
                <span>{{item.coin}}</span>
            </li>
            <li>
                <span class="titleColor">投币时间</span>
                <span>{{item.coinTime}}</span>
            </li>
        </ul>
    </div>
</template>
<script src="./script.js">
</script>
