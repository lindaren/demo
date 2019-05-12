<template>
    <div class="boxInfo">
        <div class="headers">
            <p class="placeName">{{item.name}}</p>
            <p :class="aduCls(item)">{{item.completeText}}</p>
        </div>
        <ul class="listBox marginBottom borderSet">
            <li v-if="item.isComplete==1">
                <span class="titleColor">缺失原因</span>
                <span>{{item.checkNote}}</span>
            </li>
            <li @click="toTerPage">
                <span class="titleColor">终端列表</span>
                <i class="arrowhead"></i>
            </li>
            <li>
                <span class="titleColor">场所类型</span>
                <span>{{item.ptype}}</span>
            </li>
            <li>
                <span class="titleColor">扫码套餐</span>
                <span>{{item.wxPlanName}}</span>
            </li>
            <li>
                <span class="titleColor">套餐详情</span>
                <span>{{item.planInfo}}</span>
            </li>
        </ul>
        <ul class="listBox marginBottom borderSet">
            <li>
                <span class="titleColor">场所档位</span>
                <span>{{item.plevel==null?"":item.plevel}}</span>
            </li>
            <li>
                <span class="titleColor">归属区域</span>
                <span>{{item.area}}</span>
            </li>
            <li>
                <span class="titleColor">详细地址</span>
                <span>{{item.address}}</span>
            </li>
            <li>
                <span class="titleColor">经纬度</span>
                <span>{{item.lon}},{{item.lat}}</span>
            </li>
            <li>
                <span class="titleColor">维护人员</span>
                <span>{{item.maintUser}}</span>
            </li>
            <li>
                <span class="titleColor">业务部门</span>
                <span>{{item.unitName}}</span>
            </li>
            <li>
                <span class="titleColor">业务人员</span>
                <span>{{item.bussUser}}</span>
            </li>
            <!-- <li>
                <span class="titleColor">经办人员</span>
                <span>{{item.bussUser}}</span>
            </li> -->
            <li>
                <span class="titleColor">合伙/代理</span>
                <span>{{item.coperatorName}}</span>
            </li>
            <li>
                <span class="titleColor">合伙/代理指向</span>
                <span>{{item.coperatorChain}}</span>
            </li>
            <li>
                <span class="titleColor">备注</span>
                <span>{{item.note}}</span>
            </li>
        </ul>
        <ul class="listBox marginBottom borderSet">
            <li v-if="isUserPer">
                <span class="titleColor">商家</span>
                <span>{{item.userS}}</span>
            </li>
            <li>
                <span class="titleColor">申请台数</span>
                <span>{{item.signCount}}台</span>
            </li>
            <li>
                <span class="titleColor">结算方式</span>
                <span>{{item.billTypeName}}</span>
            </li>
            <li>
                <span class="titleColor">商家分成</span>
                <span>{{item.storeRate}}%</span>
            </li>
            <li>
                <span class="titleColor">我司分成</span>
                <span>{{item.rate}}%</span>
            </li>
            <li>
                <span class="titleColor">月租金</span>
                <span>{{item.rent}}元</span>
            </li>
            <li v-if="isUserPer">
                <span class="titleColor">下月租金</span>
                <span>{{item.nextRent}}元</span>
            </li>
        </ul>
        <ul class="listBox marginBottom borderSet" v-if="isUserPer">
            <li>
                <span class="titleColor">开户行</span>
                <span>{{item.bank}}{{item.subBank}}</span>
            </li>
               <li>
                <span class="titleColor">收款人</span>
                <span>{{item.receiver}}</span>
            </li>
            <li>
                <span class="titleColor">账号</span>
                <span>{{item.account}}</span>
            </li>
            <li>
                <span class="titleColor">合同方名称</span>
                <span>{{item.ctname==null?"":item.ctname}}</span>
            </li>
            <li>
                <span class="titleColor">起始时间</span>
                <span>{{item.beginDate==null?"":item.beginDate.split(" ")[0]}}</span>
            </li>
            <li>
                <span class="titleColor">结束时间</span>
                <span>{{item.endDate==null?"":item.endDate.split(" ")[0]}}</span>
            </li>
        </ul>
        <ul class="listBox borderSet">
            <li>
                <span class="titleColor">创建人员</span>
                <span>{{item.creator}}</span>
            </li>
            <li>
                <span class="titleColor">创建日期</span>
                <span>{{item.ct}}</span>
            </li>
        </ul>
        <!-- 合同附件 -->
        <ImageCell v-if="item.contList instanceof Array&&isUserPer" :close="false" label="合同附件" v-model="item.contList" :fileLen="item.contList.length" />
    </div>
</template>

<script src="./script.js">
</script>
  