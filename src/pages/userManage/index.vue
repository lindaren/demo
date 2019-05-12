<template>
    <div class="order user">
        <!-- 搜索 -->
        <SearchInput placeholder="搜索用户名" v-model="params.sc" @submit="loadSearchData" />
        <!-- 列表 -->
        <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
            <template slot-scope="props">
                <ActionItem :to="{name: 'UserDetail',query:{user:JSON.stringify(item)}}" v-for="(item,index) in props.data" :key="index">
                    <span slot="top-left">{{item.name}}</span>
                    <span slot="top-right" class="phoneSet">{{item.phone}}</span>
                    <span slot="corner" :class="tagCls(item)">{{item.coperatorProp==1?'业务':(item.coperatorProp==2?'管理':'')}}</span>
                    <span slot="top-sub">{{item.create_time}}</span>
                    <template slot="btns">
                        <IButton icon="editor" @click="editHandler(item)" v-if="userPermission.indexOf('partner.edit')>=0">编辑</IButton>
                        <IButton icon="accredit" @click="bindPlace(item)" v-if="userPermission.indexOf('partner.accredit')>=0">授权</IButton>
                        <IButton icon="bind" @click="unbindHandler(item.id,item.isBind)" v-if="item.isBind!='未绑定'&&userPermission.indexOf('partner.bind')>=0">解绑</IButton>
                        <IButton icon="action" @click="showAction(item)">操作</IButton>
                    </template>
                </ActionItem>
            </template>
        </Scrolls>
        <mt-button class="footer-button no-select" type="primary" @click="addPerson" v-if="userPermission.indexOf('partner.add')>=0">新增用户</mt-button>
        <!-- xx -->
        <RefreshButton ref="rebtn" @click="RefreshHandler" />
        <!-- 操作 -->
        <mt-actionsheet :actions="actions" v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
@import "../order/index";
@import "./index.less";
</style>
