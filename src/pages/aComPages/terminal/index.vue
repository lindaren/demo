<template>
    <Drawer :enable="false" class="putApproval" ref="drawer" @mask-click="$refs.drawer.toggle(false)">
        <!-- 抽屉内容 -->
        <div class="drawer-content" slot="drawer">
            <div class="drawer-content-wrap">
                <Card>
                    <p slot="title">终端状态</p>
                    <TagList v-model="params.level" :data="statusList" slot="content" />
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
            <SearchInput placeholder="搜索终端" v-model="params.comAddr" @submit="loadSearchData" />
            <div class="action-box">
                <span class="number">
                    终端数量
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
                    <ActionItem :to="{name: 'TerminalManageDetail',query:{item:JSON.stringify(item)}}" v-for="(item,index) in props.data" :key="index">
                        <span slot="top-left">{{item.pname}}{{item.subPlaceName?"-"+item.subPlaceName:""}} </span>
                        <p slot="top-right" :class="dlCls(item)">{{item.comAddr}}</p>
                        <span slot="top-sub">{{item.type}}</span>
                        <template slot="btns">
                            <IButton icon="editor" @click="editTerm(item)" v-if="userPermission.indexOf('maintenance.terminal.edit')>=0">修改</IButton>
                            <IButton icon="change" @click="changeTerm(item)" v-if="userPermission.indexOf('maintenance.terminal.change')>=0">换板</IButton>
                            <IButton icon="empty" @click="deleteCurrent(item)" v-if="userPermission.indexOf('maintenance.terminal.cancel')>=0">撤机</IButton>
                        </template>
                    </ActionItem>
                </template>
            </Scrolls>
            <!--  -->
            <mt-button class="footer-button no-select" type="primary" @click="addList" v-if="userPermission.indexOf('maintenance.terminal.add')>=0">新增终端</mt-button>
            <!-- 操作 -->
            <mt-actionsheet :actions="actions" v-model="sheetVisible">
            </mt-actionsheet>
        </div>
    </Drawer>
</template>
<script src="./script.js">
</script>
