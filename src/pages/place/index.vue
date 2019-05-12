<template>
    <div ref="scroll" class="place-wrap place">
        <div>
            <SearchInput class="search_place" placeholder="搜索场所名称" v-model="params.placeName" @submit="loadSearchData" />
        </div>
        <div class="total">场所总数：
            <i class="redNum">{{totalCount}}</i>个
        </div>
        <!-- <div>做个标记</div> -->
        <!-- 列表 -->
        <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
            <template slot-scope="props">
                <div class="listBox">
                    <router-link :to="{name: 'PlaceInfo',query:{item:item}}" class="aWidth" v-for="item in props.data" :key="item.id">
                        <div class="linkBox">
                            <div style="width:100%">
                                <p>
                                    <!-- <i>{{item.termcount}}/{{item.signcount}}台</i> -->
                                    <i class="overText">{{item.placeName}} {{(+item.isValid)===0?'迁移':''}}</i>
                                </p>
                                <p class="real_text">
                                    <span class="small">{{item.placeType}}</span>
                                    <span>
                                        <span :class="item.termCount==item.signCount?'real':'real_no'">实投:{{item.termCount}}台</span>
                                        <span :class="item.termCount==item.signCount?'real':'real_no'">合同:{{item.signCount}}台</span>
                                    </span>
                                </p>
                            </div>
                            <p>
                                <i>{{item.planname}}</i>
                                <i class="arrowhead"></i>
                            </p>
                        </div>
                        <div class="smallText_address" style="height:auto;padding:0.1rem 0"> <img src="../../../static/imgs_new/address.png" alt="">
                            <span>{{item.address}}</span>
                        </div>
                        <div class="option_h"></div>
                    </router-link>
                </div>
            </template>
        </Scrolls>
        <RefreshButton @click="refresh" />
    </div>
</template>

<script src="./script.js">
</script>

<style scoped  lang="less">
@import "../../styles/custom.less";
@import "./index.less";
</style>
