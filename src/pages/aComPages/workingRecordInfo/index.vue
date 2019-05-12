<template>
    <div class="boxInfo">
        <div class="headers" v-if="item.placeName">
            <p class="placeName">{{item.placeName}}{{item.name?"-"+item.name:""}}</p>
        </div>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">终端编号</span>
                <span>{{item.comAddr}}</span>
            </li>
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span class="titleColor">起始时间</span>
                <span>{{item.beginTime}}</span>
            </li>
            <li>
                <span class="titleColor">结束时间</span>
                <span>{{item.endTime}}</span>
            </li>
            <li>
                <span class="titleColor">通电时长</span>
                <span>{{item.etime|secondTrans}}</span>
            </li>
            <li>
                <span class="titleColor">工作时长</span>
                <span>{{item.wtime|secondTrans}}</span>
            </li>
        </ul>
    </div>
</template>
<script src="./script.js">
</script>
