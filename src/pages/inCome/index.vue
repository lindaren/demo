<template>
    <div class="order income">
        <div class="nav" v-show="isNavShow">
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
            <div class="fy-search-input mint-search">
                <div class="mint-searchbar">
                    <div class="mint-searchbar-inner">
                        <i class="mintui mintui-search"></i>
                        <form class="search-form">
                            <input id="_input" ref="input" type="search" :placeholder="placeholder" class="mint-searchbar-core">
                            <i @click="clear" v-if="clearIsShow" class="mintui clear mintui-field-error"></i>
                        </form>
                    </div>
                    <!-- <a class="mint-searchbar-cancel" @click="checkTime(0)" v-text="okText"></a> -->
                    <!-- <a class="mint-searchbar-cancel time" @click="toggle()">日期</a> -->
                </div>
            </div>
        </div>
        <div class="nav" v-show="!isNavShow">
            <div class="mask_nav">
                <div @click="pickDate(-1,1)" class="active">近期收益</div>
                <div @click="pickDate(0,1)">本月收益</div>
                <div @click="pickDate(1,1)">上月收益</div>
            </div>
            <div class="pick" @click="toggle()">筛选</div>
        </div>
        <!-- <ul class="searchList" v-show="isListShow">
            <li @click="loadData(0,item.placeId,item.placeName)" v-for="(item,index) in searchList" :key="index">{{item.placeName}}</li>
        </ul> -->
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
                <button type="primary" @click="checkTime()" class="confirm">确定</button>
            </div>
        </div>
        <div class="content" v-show="isShow">
            <div class="headerBox">
                <div ref="title" class="title"></div>
                <div class="totalProfit" v-if="dataList">
                    <div class="money">{{dataList.totalIncome | fixedTwo(2)}}</div>
                    <!-- <AnimateNumber class="bigNumber money" :value="dayMoney" /> -->
                    <div class="circle">(
                        <span id="beginDate"></span>
                        <span>至</span>
                        <span id="endDate"></span>)</div>
                </div>
            </div>
            <!-- <div class="out"> -->
            <!-- <v-chart :data="data" >
                <v-scale x :tick-count="0" />
                <v-scale y :min="0" :ticks="ticks" />
                <v-point :style="{
                stroke: '#fff',
                lineWidth: 1
                }" shape="smooth" />
                <v-tooltip show-crosshairs show-x-value/>
                <v-area />
                <v-line />
            </v-chart> -->
            <!-- </div> -->
            <div id="chartmain"></div>
            <div class="blank"></div>
            <div class="detailBox">
                <router-link class="detail" style="color:black" :to="{name:'InComeShow',params:{placeId:JSON.stringify(params)}}">
                    <div>
                        <div>
                            <span class="block"></span>
                            <span>明细详情</span>
                        </div>
                        <i class="arrowhead arrowhead1"></i>
                    </div>
                </router-link>
            </div>
        </div>

    </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
@import "../order/index";
@import "./index";
@import "../../component/SearchInput/index.less";
@import "../incomeInfo/index";
@import "../home/index";
@import "../../component/SearchInput/index.less";
body {
  // width: 100%;
  // height: 100%;
  margin: 0;
  padding: 0;
}

#chartmain {
  width: 100%;
  height: 270px;
}
.order {
  width: 100%; //   height: 100%;
  overflow: auto;
}

.mint-search {
  height: 45px;
}

.arrowhead {
  position: absolute;
  right: -15px;
  top: 30px;
}
.showDetail {
  transform: rotate(135deg);
}
.hideDetail {
  transform: rotate(45deg);
}
.arrowhead1 {
  position: absolute;
  right: 15px;
  top: 14px;
}

.orderBody {
  width: 100%;
  overflow: hidden;
}

.orderBody a {
  display: block;
  padding: 0 20px 0 10px;
}

.moneyBlue1 {
  //   margin-top: 20px;
  font-size: 0.32rem;
}

.aWidth {
  width: 100%;
}

.searchList {
  width: 100%;
  position: fixed;
  top: 45px;
  //   margin-top: 45px;
  background-color: #f0f5fe;
  text-align: center;
  z-index: 999999999;
  /* display: none; */
}

.searchList li {
  height: 35px;
  line-height: 35px;
  border-bottom: 1px solid #eee;
}

.detailBox {
  position: relative;
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
.block {
  width: 3px;
  height: 22px;
  background-color: #689df7;
  vertical-align: middle;
}
.circle {
  color: #ccc;
  font-size: 13px;
}
.li_left {
  max-width: 230px;
}
// .layui-laydate,
// .layui-laydate-hint {
//   background-color: #fafae1 !important;
// }
// .laydate-footer-btns{
//     right:40px;
// }
// .layui-laydate-main{
//     left:calc(50% - 136px);
// }
// .laydate-footer-btns span{
//     margin: 0 0 0 20px;
// }
</style>
