<template>
    <!-- 终端更换记录  -->
    <Drawer 
        :enable="false" 
        class="putApproval" 
        ref="drawer" 
        @mask-click="$refs.drawer.toggle(false)">
        <!-- 抽屉内容 -->
        <div class="drawer-content" slot="drawer">
            <div class="drawer-content-wrap">
                <Input  class="border-bottom" label="终端编号" v-model="params.comAddr" placeholder="请输入终端编号" />
                <div class="drawer-footer-btns">
                    <mt-button class="default-btn" type="default" @click="reset">重置</mt-button>
                    <mt-button class="primary-btn" type="primary" @click="submit()">确定</mt-button>
                </div>
            </div>
        </div>
        <!-- 主页 -->
        <div class="content-body" slot="content">
          <div class="nav">
                <select name="" id="">
                <option value="">场所名称</option>
                <option value="">终端编号</option>
            </select>
            <SearchInput placeholder="请输入搜索内容" v-model="params.qry_name" @submit="loadSearchData" />
          </div>
            <!-- 列表 -->
            <!-- <Scrolls ref="datas" :param="params" @change="scrollChange" :URL="URL" class="page-loadmore-wrapper">
                <template slot-scope="props">
                    <Row 
                        v-for="(item,index) in props.data" 
                        :key="index" 
                        :leftTop="item.creator" 
                        :leftSub="item.comadd1" 
                        :rightTop="item.comadd2"
                        :to="{name:'ChangeRecordInfo',query:{info:JSON.stringify(item)}}" 
                        >
                    </Row>
                </template>
            </Scrolls> -->
             <ul class="orderBody">
                <li v-for="item in orders" :key="item.id">
                    <div>
                        <p class="placeTerm">
                            <span>{{item.comaddr}}</span>
                            <span class="overText">{{item.placename}}</span>
                        </p>
                        <p class="timeText">{{item.create_time}}</p>
                    </div>
                    <div>
                        <p class="moneyRed">{{item.total_fee|fixedTwo(2)}}
                            <i class="smallText">元</i>
                        </p>
                        <img v-if="item.orderStatus==2" class="refund" src="../../../../static/imgs/refund.png" />
                    </div>
                </li>
            </ul>
        </div>
    </Drawer>
</template>
<script src="./script.js">
</script>
<style scoped lang="less">
@import "../../home/index.less";
.mint-search {
  width: 70%;
  float: right;
}
.nav {
  height: 45px;
  background-color: #efeff4;
}
select {
  width: 25%;
  height: 28px;
  margin-left: 10px;
  margin-top: 8px;
  text-align: center;
  text-align-last: center;
  font-size: 13px;
  border: 1px solid lightblue;
  outline: none;
}
.page-loadmore-wrapper {
  top: 0.9rem;
}
 
</style>

