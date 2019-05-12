<template>
    <!-- 远程操作查询  -->
    <Drawer 
        :enable="false" 
        class="putApproval" 
        ref="drawer" 
        @mask-click="$refs.drawer.toggle(false)">
        <!-- 抽屉内容 -->
        <div class="drawer-content" slot="drawer">
            <div class="drawer-content-wrap">
                <Card>
                    <p slot="title">操作类型</p>
                    <TagList v-model="params.type" :data="typeList" slot="content" />
                </Card>
                <Input  class="border-bottom" label="终端编号" v-model="params.comAddr" placeholder="请输入终端编号" />
                <div class="drawer-footer-btns">
                    <mt-button class="default-btn" type="default" @click="reset">重置</mt-button>
                    <mt-button class="primary-btn" type="primary" @click="submit()">确定</mt-button>
                </div>
            </div>
        </div>
        <!-- 主页 -->
        <div class="content-body" slot="content">
            <!-- 日期选择 -->
            <DateRange @submit="loadSearchData" @reset="reset"  @input="dateChange"/>
            <div class="action-box">
                <span class="number">
                    记录总数
                    <i>{{params.totalCount}}</i>
                </span>
                <span class="btn font-right">
                    <span @click="$refs.drawer.toggle(true)"> 筛选 <img class="filter" src="../../../../static/imgs/filter.svg"></span>
                </span>
            </div>
            <!-- 列表 -->
            <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
                <template slot-scope="props">
                    <Row 
                        v-for="(item,index) in props.data" 
                        :key="index" 
                        :leftTop="item.comaddr+'-工作时间'+item.time+'分钟'" 
                        :leftSub="item.create_time" 
                        :rightTop="item.operuser+'-'+item.opertype">
                        <Tag size="small" slot="rightSub" :type="item.result=='成功'?'success':'error'" >{{item.result}}</Tag>
                    </Row>
                </template>
            </Scrolls>
        </div>
    </Drawer>
</template>
<script src="./script.js">
</script>
