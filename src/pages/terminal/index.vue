<template>
    <div ref="scroll" class="terminal-wrap">
        <!-- 标记 -->
        <div class="terminal_top">
            <div class="terminal_select">
                <div class="terminal_name" @click="showSelect()">
                    <span>{{name[0].name}}</span>
                    <img class="img_name" :src="imgUrl" alt="">
                </div>
                <div class="terminal_op" v-show="showSe">
                    <div v-for="(item,index) in name" @click="getSelect(item,index)" :key="index" :class="item.select=='ye'?'select_c':''">{{item.name}}</div>
                </div>
            </div>
            <SearchInput class="search_places" :placeholder="placeholder" v-model="sc" @submit="loadSearchData" />
        </div>
        <p class="total_te total_online">
            <span v-for="(item,index) in totalArr" :class="item.se=='ye'?'redNums':''" :key="index" @click="getState(item)">{{item.name}}:{{item.data}}</span>
        </p>
        <!-- 列表 -->
        <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
            <template slot-scope="props">
                <ul class="listBox linkBox_term">
                    <li class="linkBox linkBoxTermi" v-for="item in props.data" :key="item.id">
                        <section style="width:100%">
                            <div>{{item.placeName||item.pname}} {{item.subPlaceName!=null?'-'+item.subPlaceName:""}}</div>
                                <div style="position: relative;left: 0.1rem;display:inline-block;width:100%">
                                    <div style="position: relative;width:100%;">
                                        <i>{{item.termNo}}</i>
                                        <i style="color:#F21014;position: relative;left: 0.4rem;">{{item.errStr?item.errStr:""}}</i>
                                        <i style="position: relative;left: 1.5rem;font-size:0.23rem;color:#689DF7" @click="lookDetails(item.termNo,item.status,flagId)">{{flagId == item.termNo?"收起详情":"查看详情"}}</i>
                                        <div style="display:inline-block; position: absolute;right: 0.28rem;top:-0.06rem" :class="{'grayText':item.status == '离线','greenText':item.status == '在线','blueText':item.status == '工作'}">{{item.status}}
                                        </div>
                                    </div>
                                    <div>
                                        <span class="linkBox_texts" v-for="types in errArr" v-if="(item.status=='故障')&&(types.value == item.err)&&(flagId == item.termNo)">{{types.name}}</span>
                                        <span class="linkBox_texts"  v-if="(flagId == item.termNo)">
                                            {{time}}
                                        </span>
                                    </div>
                                </div>
                        </section>
                    </li>
                </ul>
            </template>
        </Scrolls>
        <RefreshButton @click="refresh" />
    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
@import "./index";
</style>
