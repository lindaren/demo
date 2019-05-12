<template>
<!-- 
    v-model="value"  选中的值
    submit 确定事件
    cancel 取消事件
    textChange 左侧搜索
    rightData 右侧数据
    leftData    左侧数据
    titles 标题
 -->
    <FyTransfer 
        ref="tran" 
        v-model="value" 
        @submit="submit" 
        @cancel="cancel" 
        @textChange="tranSearch" 
        :rightData="rightData" 
        :leftData="leftData" 
        :titles="titles" 
        :loading="loading"
        />
</template>

<script src="./script.js">
</script>

<style lang="less">
@import "./index.less";
</style>
