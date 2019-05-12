<template>
  <div class="order">
    <div class="nav">
      <div class="terminal_top">
        <div class="terminal_select">
          <div class="terminal_name">
            <span>{{name[0].name}}</span>
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
          <a class="mint-searchbar-cancel" @click="checkTime(0)" v-text="okText"></a>
        </div>
      </div>
    </div>
    <div class="nav2">
      <div class="mask_nav">
        <div @click="pickDate(-1)" class="active">近期收益</div>
        <div @click="pickDate(0)">本月收益</div>
        <div @click="pickDate(1)">上月收益</div>
        <div @click="toggle()">选择日期</div>
      </div>

    </div>
    <div class="maskBox" @click="toggle()">
    </div>
    <div class="mask">
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
    <p class="allCount">
      <span>合计金额</span>
      <span class="redT">
        <span class="fy-number" style="opacity: 1;">{{totalIncome | fixedTwo()}}</span>
        <i class="smallT">元</i>
      </span>
    </p>
    <mt-loadmore 
    infinite-scroll-disabled="loading" 
    v-infinite-scroll="more" 
    infinite-scroll-distance="50" 
    :top-method="loadTop"
    :bottom-method="loadBottom" 
    :bottom-all-loaded="allLoaded" 
    :auto-fill="false" 
    ref="loadmore">
      <div class="listBox" v-for="(item,index) in dataList" :key="index">
        <router-link :to="{name:'InComeInfo',query:{beginDate:item.sysCreateTimeStr,endDate:item.sysCreateTimeStr,placeId:item.placeId}}"
          class="linkBox">
          <div>
            <p>
              <i class="overText">{{item.placeName}} </i>
            </p>
            <p class="smallText">{{item.sysCreateTimeStr}}</p>
          </div>
          <div class="inlineBox">
            <div>
              <p class="setTextL">
                <i class="redNum">{{item.income | fixedTwo()}}</i>元</p>
              <p class="smallText">终端{{item.signCount}}台</p>
            </div>
            <i class="arrowhead"></i>
          </div>
        </router-link>
      </div>
    </mt-loadmore>
    <p v-if='allLoaded' class='loading'>
      全部数据已加载完毕
    </p>
    <div class="noData" v-show="showError">
      <img src="../../../static/imgs/not-data.svg" alt="">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
  @import "../inCome/index";
  @import "../home/index";
  @import "../../component/SearchInput/index.less";
  @import "./index";
</style>