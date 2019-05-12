<template>
    <div class="news">
        <div class="option_top">
            <span v-for="item in headerType" :class="item.select=='ye'?'option_bo':''" @click="switcher(item)">{{item.name}}</span>
        </div>
        <div class="option_h"></div>
        <!-- 个人消息 -->
        <div class="personage">
           <div v-for="item in news">
               <div> <div class="person_cel"></div> 【{{item.name}}】</div>
               <div>{{item.time}}</div>
               <div>{{item.info}}</div>
           </div>
        </div>
    </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
</style>