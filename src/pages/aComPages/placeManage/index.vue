<template>
    <Drawer :enable="false" class="putApproval" ref="drawer" @mask-click="$refs.drawer.toggle(false)">
        <!-- 抽屉内容 -->
        <div class="drawer-content" slot="drawer">
            <div class="drawer-content-wrap">
                <Card>
                    <p slot="title">审计状态</p>
                    <TagList v-model="params.isComplete" :data="statusList" slot="content" />
                </Card>
                <Card>
                    <p slot="title">结算方式</p>
                    <TagList v-model="params.billType" :data="chargeWayList" slot="content" />
                </Card>
                <div class="drawer-footer-btns">
                    <mt-button class="default-btn" type="default" @click="reset">重置</mt-button>
                    <mt-button class="primary-btn" type="primary" @click="submit()">确定</mt-button>
                </div>
            </div>
        </div>
        <!-- 主页 -->
        <div class="content-body" slot="content">
            <!-- 搜索 -->
            <SearchInput placeholder="搜索场所" v-model="params.qry_name" @submit="loadSearchData" />
            <div class="action-box">
                <span class="number">
                    场所数量
                    <i>{{params.totalCount}}</i>
                </span>
                <span class="btn font-right">
                    <span @click="reset">重置</span>
                    <span @click="$refs.drawer.toggle(true)"> 筛选 <img class="filter" src="../../../../static/imgs/filter.svg"></span>
                </span>
            </div>
            <!-- 列表 -->
            <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
                <template slot-scope="props">
                    <ActionItem :to="{name: 'PlaceManageDetail',query:{item:JSON.stringify(item)}}" v-for="(item,index) in props.data" :key="index">
                        <span slot="top-left">{{item.name}} {{(+item.isValid)===0?'迁移':''}}</span>
                        <!-- :class="aduCls(item)" -->
                        <p slot="top-right" >{{item.termCount}}/{{item.signCount}} </p>
                        <span slot="top-sub">{{item.ptype}}</span>
                        <template slot="btns">
                            <IButton icon="editor" @click="editBasic(item.id)" v-if="userPermission.indexOf('maintenance.placeManage.editBase')>=0">修改信息</IButton>
                            <IButton icon="editor" @click="editCon(item.id)" v-if="item.isComplete != 2&&userPermission.indexOf('maintenance.placeManage.editContract')>=0">修改合同</IButton>
                            <IButton icon="empty" @click="deleteCurrent(item.id)" v-if="userPermission.indexOf('maintenance.placeManage.delete')>=0">删除</IButton>
                        </template>
                    </ActionItem>
                </template>
            </Scrolls>
            <!--  -->
            <mt-button class="footer-button no-select" type="primary" @click="addList" v-if="userPermission.indexOf('maintenance.placeManage.add')>=0">新增场所</mt-button>
            <!-- 操作 -->
            <mt-actionsheet :actions="actions" v-model="sheetVisible">
            </mt-actionsheet>
        </div>
    </Drawer>
</template>
<script src="./script.js">
</script>
