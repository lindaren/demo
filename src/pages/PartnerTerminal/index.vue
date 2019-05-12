<template>
    <div ref="scroll" class="terminal-wrap">
        <!-- 标记 -->
        <div class="terminal_top">
            <div class="terminal_select">
                <div class="terminal_name" >
                    <span>{{name[0].name}}</span>
                    <img class="img_name" :src="imgUrl" alt="">
                </div>
                <!-- <div class="terminal_op" v-show="showSe">
                    <div v-for="(item,index) in name" @click="getSelect(item,index)" :key="index" :class="item.select=='ye'?'select_c':''">{{item.name}}</div>
                </div> -->
            </div>
            <SearchInput class="search_places" placeholder="请输入场所名称" v-model="sc" @submit="loadSearchData" />
        </div>
         <p class="total_te total_online">
            <span v-for="(item,index) in totalArr"  :key="index" >{{item.name}}:{{item.data}}</span>
        </p>
        <!-- 列表 -->
         <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrappers">
            <template slot-scope="props">
                <div class="listBox">
                    <router-link :to="{name: 'Terminal',query:  String(item.placeId)}" class="aWidth" v-for="item in props.data" :key="item.id">
                        <div class="linkBox" >
                            <div>
                                <p>
                                    <i class="overText" style="width:3.6rem">{{item.placeName}} {{(+item.isValid)===0?'迁移':''}}</i>
                                    <i class="place_text" style="color: #37a50c">在线:{{item.onlineNum}}</i>
                                    <i :class="item.offlineNum=='0'?'place_text place_text_co':'place_text place_text_r'" >离线:{{item.offlineNum}}</i>
                                    <i :class="item.faultNum=='0'?'place_text place_text_co':'place_text place_text_s'" >故障:{{item.faultNum}}</i>
                                </p>
                            </div>
                             <p>
                                <i>{{item.planname}}</i>
                                <i class="arrowhead"></i>
                            </p>
                        </div>
                         <div class="smallText_address" style="height:auto;padding:0.1rem 0"  > <img src="../../../static/imgs_new/address.png" alt=""> <span>{{item.address}}</span> </div>
                         <div class="option_h"></div>
                    </router-link>
                </div>
            </template>
        </Scrolls>
        <RefreshButton @click="refresh" />
    </div>
</template>

<script src="./index.js">
</script>

<style scoped lang="less">
@import "./index";
@import "../place/index.less";
</style>
