<template>
  <div class="box">
    <div>
      <!-- v-show="isShow" -->
      <div v-if="isShow" class="navBox">
        <span class="text">场所名称:</span>
        <!-- <select name="" id="" class="moneyBlue" @change="search(0)">
          <option :value="item.placeId" v-for="(item,index) in searchList" :key="index">{{item.placeName}}</option>
         
        </select> -->
        <div class="terminal_top" v-if="total>1">
          <!-- <div class="terminal_select"> -->
          <div class="terminal_name" @click="showSelect()" v-if="name.length!=0">
            <span>{{name[0].placeName}}</span>
            <img class="img_name" :src="imgUrl" alt="">
          </div>
          <div class="terminal_op" v-show="showSe">
            <div v-for="(item,index) in name" :key="index" @click="getSelect(item.placeId,index,item)" :class="item.select=='ye'?'select_c':''">{{item.placeName}}</div>
          </div>
          <!-- </div> -->
        </div>
        <div class="terminal_top" v-if="total == 1">
            {{name[0].placeName}}
        </div>
      </div>
      <div class="number">
        <span>设备数量:</span>
        <span class="moneyBlue">{{list.total}}台</span>
      </div>
      <div class="nav">
        <div>
          <span>
            <span>收入金额:</span>
            <span class="moneyBlue num">{{list.totalIncome|fixedTwo(2)}}</span>
            <span>元</span>
          </span>
          <span style="margin-left:10px;">
            <span>退款金额:</span>
            <span class="moneyBlue num red">{{list.refund|fixedTwo(2)}}</span>
            <span>元</span>
          </span>
        </div>

      </div>
      <!-- <div class="payWay">
       <div>
          <span>微信收款:</span>
          <span class="moneyBlue wx">{{list.wxPayCount}}笔</span>
       </div>
       <div>
          <span>支付宝收款:</span>
          <span class="moneyBlue">{{list.aliPayCount}}笔</span>
       </div>
       
      </div> -->
    
      <div class="time">
        <span>时间范围:</span>
        <span class="moneyBlue dateRange">4月-5月</span>
      </div>
      <div class="text1">温馨提示：左右滑动列表可查看更多信息</div>
        <div class="in">
          <table border="1" id="t">
            <tr class="theader t1" ref="theader">
              <th v-for="(item,index) in key" :key="index" v-if="index<2">{{item}}</th>
            </tr>
            <tr class="a" v-for="(item,index) in value" :key="index">
              <td v-for="(a,index) in item" :key="index" v-if="index<2">{{a}}</td>
            </tr>
          </table>
        </div>
      <div class="out">
        <table border="1">
          <tr class="theader" ref="theader">
            <th v-for="(item,index) in key" :key="index">{{item}}</th>
          </tr>
          <tr class="a" v-for="(item,index) in value" :key="index">
            <td v-for="(a,index) in item" :key="index">{{a}}</td>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>

<script src="./script.js">
</script>

<style scoped lang="less">
body {
  color: #8b8b8b;
}

.out {
  overflow: scroll;
  background-color: white;
}

.in {
  background-color: white;
  padding-left: 1px;
  float: left;
}

.text {
  font-size: 14px;
  float: left;
  padding-right: 10px;
}

table {
  width: 100%;
  text-align: center;
  white-space: nowrap;
}

.theader,
.dark {
  background-color: #ecefff;
}

.theader th {
  border: none;
  padding: 0 12px;
}

.dark {
  border: none;
  border-left: 2px solid #abb7f8;
}

th,
td {
  height: 35px;
  line-height: 35px;
  border-right: 1px solid #cfdbf5;
}

tr:not(.theader):nth-child(odd) {
  background-color: #f4f7fe;
}

table tr td:nth-of-type(2) {
  border-right: 2px solid #cfdbf5;
  background-color: #ecefff;
  border-top: none;
  border-bottom: none;
}

select {
  height: 28px;
  margin-left: 10px;
  margin-top: 8px;
  /* text-align: center !important; */
  /* text-align-last: center !important; */
  font-size: 13px;
  border: 1px solid lightblue;
  outline: none;
  padding-left: 5px;
}

.nav {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  height: 30px;
  line-height: 30px;
}

.number {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 15px;
}

.terminal_top {
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
}

.terminal_name {
  background-color: white;
  height: 0.56rem;
  display: flex;
  justify-content: center;
  align-items: center; // width: 5rem;
  color: #999999; // border-right: 1px dashed #eee;
  position: relative;
  z-index: 100;
  float: left; // padding-left: 10px; // top: 8px;
  // left: 11px;
  padding: 0 10px;
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
  z-index: 9999;
  text-align: center;
  border: 1px dashed #ddd;
  background: #c5d5ef;
  top: 35px;
  left: 3px;
  color: white;
}

.select_c {
  background-color: #689df7;
  color: white;
  padding: 0 10px;
}

.terminal_op div {
  border-top: 1px solid #eee;
  line-height: 0.5rem;
}

.navBox {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  background-color: #f0eff5;
  z-index: 11111;
  margin-bottom: 5px;
}

.time {
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
}
.payWay {
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  div {
    min-width: 102px;
    float: left;
    margin-right: 12px;
  }
}
.text1 {
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: gray;
}
</style>