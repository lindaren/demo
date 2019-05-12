<template>
    <div class="boxInfo">
        <div class="headers">
            <p class="placeName">{{item.placename}}</p>
        </div>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span class="titleColor">原终端编号</span>
                <span>{{item.comadd1}}</span>
            </li>
            <li>
                <span class="titleColor">原终端投币底数</span>
                <span>{{item.coin1}}</span>
            </li>
            <li>
                <span class="titleColor">新终端编号</span>
                <span>{{item.comadd2}}</span>
            </li>
            <li>
                <span class="titleColor">新终端投币底数</span>
                <span>{{item.coin2}}</span>
            </li>
            <li>
                <span class="titleColor">维护人员</span>
                <span>{{item.creator}}</span>
            </li>
            <li>
                <span class="titleColor">终端更换时间</span>
                <span>{{item.ct}}</span>
            </li>
        </ul>
    </div>
</template>
<script src="./script.js">
</script>
