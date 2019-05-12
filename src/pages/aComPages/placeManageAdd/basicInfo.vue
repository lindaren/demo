<template>
        <div>
            <Input label="场所名称" placeholder="请输入场所名称" v-required v-model="form.name" class="border-bottom"></Input>
            <Cell label="场所类型" required v-model="form.type" :list="placeTypeList" />
            <Cell label="产品类型" required v-model="form.tmType" :list="productList" @change="weChartTao"/>
            <Cell label="扫码套餐" @change="planChange" required v-model="form.planId" :list="weChatList" />
            <Cell label="套餐详情" isText :value="weChatInfo" :arrow="false" placeholder="" />

            <Cell label="场所档位" class="marginTop" v-model="form.level" :list="placeLevelList" />
            <City label="归属区域" placeholder="请选择区域" required v-model="form.allCity" />
            <Cell label="详细地址" placeholder="请输入详细地址" v-model="form.address" @rightClick="isPickupMapShow=true" isText required />
            <Cell label="经纬度" placeholder="请输入经纬度" isText required :arrow="false" :value="long_lat" />
            <!-- <PersonCell label="维护人员" v-model="form.maintainId" required placeholder="请选择" qryRole="10" /> -->
            <Cell label="业务部门" required v-model="form.unitid" :list="deparList"  />
            <PersonCell label="业务人员" v-model="form.salesId" :defaultValue="form.salesman" required placeholder="请选择" qryRole="6" />
            <PersonCell label="经办人员" v-model="form.operator" :defaultValue="form.operatorName" required placeholder="请选择" qryRole="6,25" userProp="1,2,4" />

            <BusinCell label="合伙/代理" placeholder="请选择合伙/代理" :prevUserId="form.salesId" :checkbox="false" userProp="2,4" v-model="form.lastCoperator" class="marginTop" />
            <Input label="备注" placeholder="备注信息" type="textarea" class="border-bottom" :rows="3" v-model="form.note"></Input>
            <PickupMap @change="mapChange" v-model="isPickupMapShow" />
        </div>
</template>
<script>
import { getDICT, weChartQr, getCitys ,getDepar } from "@/services/common";
export default {
  name: "basicInfo",
  props: {
    form: Object
  },
  data() {
    return {
      isPickupMapShow: false,
      placeTypeList: [], //场所类型
      weChatList: [], //微信套餐
      weChatInfo: "", //微信套餐当前详情
      deparList:[],
      productList:[],//产品类型
      placeLevelList: [] //场所档位
    };
  },
  created() {
    this.placeType(); //场所类型
    this.placeLevel(); //场所档位
    this.weChartTao(); //扫码套餐
    this.getDepar();//业务部门
  },
  computed: {
    long_lat() {
      return this.form.longitude + "," + this.form.latitude;
    }
  },
  methods: {
    // 场所类型
    async placeType() {
      this.placeTypeList = await getDICT("placeType");
      this.productList=await getDICT("termType")
    },
    //扫码套餐
    async weChartTao() {
      this.weChatList = await weChartQr(this.form.tmType);
          this.weChatList.map(item=>{
          if(item.id==this.form.planId){
              this.weChatInfo=item.planInfo.replace(/#/g, " | ");
          }
      });
    }, 
    //微信套餐当前详情
    planChange({ planInfo = "" } = {}) {
      this.weChatInfo = planInfo.replace(/#/g, " | ");
    },
     //场所档位
    async placeLevel() {
      this.placeLevelList = await getDICT("placeLevel");
    },
    //业务部门
    async getDepar(){
        this.deparList = await getDepar({pid:'18'});
    },
    //地址选择回调
    mapChange({ poiaddress, latlng = {} } = {}) {
      this.form.address = poiaddress;
      this.form.latitude = latlng.lat;
      this.form.longitude = latlng.lng;
    }
  }
};
</script>  

