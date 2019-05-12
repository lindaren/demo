<template>
    <div >
        
        <mt-loadmore infinite-scroll-disabled="loading" :infinite-scroll-distance="20" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <ul class="orderBody">
                <!-- <router-link :to="{name: 'InComeDetail',query:{placeId:JSON.stringify(item.placeId)}}" class="aWidth" v-for="item in data"
                                :key="item.id"> -->
                <router-link :to="{name: 'InComeDetail',query:{placeId:item.placeId,beginDate:params.beginDate,endDate:params.endDate,temNo:params.temNo}}" v-for="item in detailList" :key="item.id">
                    <li>

                        <div class="li_left">
                            <p class="placeTerm">
                                <span>{{item.placeName}}</span>
                            </p>
                            <p class="timeText" style="width:95%">{{item.address}}</p>
                        </div>
                        <div class="right">
                            <p class="moneyBlue1 moneyBlue"> + {{item.income|fixedTwo(2)}}
                                <i class="smallText">元</i>
                            </p>
                            <p class="moneyRed"> - {{item.refund|fixedTwo(2)}}
                                <i class="smallText">元</i>
                            </p>

                            <i class="arrowhead"></i>

                        </div>

                    </li>
                </router-link>
                <!-- </router-link> -->
            </ul>
        </mt-loadmore>
</div>
</template>
<script src="./script.js">
</script>
<style scoped lang="less">
@import "../order/index";
@import "../incomeInfo/index";
@import "../home/index";
body {
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
</style>
