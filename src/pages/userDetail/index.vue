<template>
    <div ref="scroll" class="box-wrap user-wrap">
        <mt-loadmore :auto-fill="false" :bottomPullText="bottomPullText" :bottom-method="loadBottom" ref="loadmore">
            <Cell label="用户名" v-model="username" isText placeholder="" :arrow="false"/>
            <Cell label="用户类型" v-model="userType" disabled :list="userTypeList"/>
            <Cell label="合伙类型" v-model="userProp" disabled :list="[{id:'2',name:'合伙人'},{id:'4',name:'代理自购'}]" v-if="userProp==2||userProp==4"/>
            <Cell label="手机号" v-model="phone" isText placeholder="" :arrow="false"/>
            <Input ref="placeJudge" label="授权场所" placeholder="可查询场所" v-model="placeValue" @input="placeInput"></Input>
            <p class="totalP marginTop">场所总数：
                <span class="red">{{params.totalCount}}</span>个
            </p>
            <LoadingBox v-if="isLoading" :rows="10" />
            <NotDataTip :show="placeList.length==0&&(isLoading===false)" />
            <div class="fy-cell border-bottom" v-for="item in placeList" :key="item.id">
               {{item.name}}
            </div>
        </mt-loadmore>
    </div>
</template>

<script src="./script.js">
</script>

<style lang="less">
@import "../addPerson/index.less";
@import "./index.less";
</style>
