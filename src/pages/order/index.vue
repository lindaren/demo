<template>
    <div class="order">
        <!-- <div class="nav">
            <select name="" id="">
                <option value="">场所名称</option>
                <option value="">设备编号</option>
            </select>
             <SearchInput class="search_place" placeholder="搜索场所名称" v-model="params.sc" @submit="loadSearchData" />
            <span class="pickTime" @click="toggle()">日期</span>
        </div> -->
        <div class="nav">
            <!-- <select name="" id="" @change="searchType()" ref="sel">
                <option v-for="(item,index) in selectList" :value="item.id" :key="index">{{item.name}}</option>
            </select> -->
            <div class="terminal_top">
                <div class="terminal_select">
                    <div class="terminal_name" @click="showSelect()">
                        <span>{{name[0].name}}</span>
                        <img class="img_name" :src="imgUrl" alt="">
                    </div>
                    <div class="terminal_op" v-show="showSe">
                        <div v-for="(item,index) in name" :key="index" @click="getSelect(item,index)" :class="item.select=='ye'?'select_c':''">{{item.name}}</div>
                    </div>
                </div>
            </div>

            <!-- <SearchInput class="search_place" placeholder="搜索场所名称" v-model="params.sc" @submit="loadSearchData" /> -->
            <div class="fy-search-input mint-search">
                <div class="mint-searchbar">
                    <div class="mint-searchbar-inner">
                        <i class="mintui mintui-search"></i>
                        <form class="search-form">
                            <input id="_input" ref="input" type="search" :placeholder="placeholder" class="mint-searchbar-core">
                            <i @click="clear" v-if="clearIsShow" class="mintui clear mintui-field-error"></i>
                        </form>
                    </div>
                    <a class="mint-searchbar-cancel" @click="checkTime(0)" v-text="okText"></a>
                    <a class="mint-searchbar-cancel time" @click="toggle()">日期</a>
                </div>
            </div>
            <!-- <ul class="searchList" v-show="isListShow">
                <li @click="loadData(0,item.placeId,item.placeName)" v-for="(item,index) in searchList" :key="index">{{item.placeName}}</li>
            </ul> -->
            <!-- <span class="pickTime" @click="toggle()">日期</span> -->
        </div>
        <div class="maskBox" @click="toggle()">
        </div>
        <div class="mask">
            <div class="mask_header">
                <div @click="pickDate()">近期收益</div>
                <div @click="pickDate(0)">本月收益</div>
                <div @click="pickDate(1)">上月收益</div>
            </div>
            <div class="inputBox">
                <label for="">开始时间</label>
                <input id="test1" class="demo-input" ref="startTime" placeholder="请输入开始时间" />
            </div>
            <div class="inputBox">
                <label for="">结束时间</label>
                <input id="test2" class="demo-input" ref="endTime" placeholder="请输入结束时间" />
            </div>
            <div class="bottom">
                <button type="default" @click="reset()" class="reset">重置</button>
                <button type="primary" class="confirm" @click="checkTime()">确定</button>
            </div>
        </div>
        <!-- <div class="content" ref="scroll">
            <Scrolls ref="datas" :prop="{list:'rows'}" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
                <template slot-scope="props"> -->
        <!-- <div class="dataList"> -->
        <mt-loadmore infinite-scroll-disabled="loading" :top-method="loadTop" :bottom-method="loadBottom"
            :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <ul class="orderBody">
                <li v-for="item in dataList" :key="item.id">
                    <div class="item_left">
                        <p class="placeTerm">
                            <span>{{item.termNo}}</span>
                            <span class="placeName">{{item.placeName}}</span>
                        </p>
                        <p class="timeText">{{item.orderCt}}</p>
                    </div>
                    <img :src="imgRefund" v-if="item.orderStatus==2" class="imgUrl" alt="">
                    <img :src="imgReVip" v-if="item.payWay==9" class="imgUrl imgUrl_vip" alt="">
                    <p class="moneyRed">{{item.totalIncome|fixedTwo(2)}}
                        <i class="smallText">元</i>
                    </p>
                </li>

            </ul>
        </mt-loadmore>
        <div class="noData" v-if="showError">
            <img src="../../../static/imgs/not-data.svg" alt="">
            <p>暂无数据</p>
        </div>
    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
@import "./index";
@import "../inCome/index";
@import "../home/index";
@import "../../component/SearchInput/index.less";
.order {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.orderBody {
  width: 100%;
  overflow: hidden;
  margin-top: 45px;
}

.orderBody li {
  padding-top: 2px;
  height: 1rem;
  //   line-height: 1rem;
}

.mint-search {
  height: 45px;
}

.searchList {
  width: 100%;
  position: absolute;
  top: 45px;
  background-color: #f0f5fe;
  text-align: center;
  z-index: 111;
  /* display: none; */
}

.searchList li {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #eee;
}

.terminal_name {
  background-color: white;
  height: 0.56rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  color: #999999;
  border-right: 1px dashed #eee;
  position: relative;
  z-index: 100;
  float: left;
  top: 8px;
  left: 11px;
}

.img_name {
  width: 10px;
  height: 4px;
  position: relative;
  left: 0.1rem;
}

.terminal_select {
  position: relative;
}

.terminal_op {
  position: absolute;
  width: 2rem;
  z-index: 1000;
  text-align: center;
  border: 1px dashed #eee;
  background: #c5d5ef;
  top: 40px;
  left: 10px;
  color: white;
}

.select_c {
  background-color: #689df7;
  color: white;
}

.terminal_op div {
  border-top: 1px solid #eee;
  line-height: 0.5rem;
}

.imgUrl {
  width: 70px;
  position: absolute;
  right: 70px;
  top: -8px;
}

.mint-search {
  width: 72%;
}

.search-form {
  position: relative;
}

.clear {
  position: absolute;
  right: 0;
  top: 2px;
}

.noData {
  width: 100%;
  text-align: center;
  padding: 0.3rem 0;
  img {
    width: 35%;
    height: auto;
  }
  p {
    text-align: center;
    font-size: 0.3rem;
    color: rgba(0, 0, 0, 0.5);
  }
}
.placeName {
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item_left {
  width: 80%;
  height: 100%;
}
.placeTerm {
  height: 25px;
  line-height: 25px;
  span {
    float: left;
    margin-right: 10px;
  }
}
</style>