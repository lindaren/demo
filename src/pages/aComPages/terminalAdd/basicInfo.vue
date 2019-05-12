<template>
    <div>
        <PlaceCell :disabled="form.placeVisible" label="场所名称" v-model="form.placeId" :defaultValue="form.placeName" @change="placeChange" required placeholder="请选择" />
        <Input label="附加信息" placeholder="请输入附加信息" v-model="form.name" class="border-bottom"></Input>
        <TerminalCell :disabled="form.placeVisible" label="终端编号" v-model="form.comAddr" :defaultValue="form.comAddr" @change="terminalChange" required placeholder="请选择" />
        <Input v-if="!form.id" label="测试次数" placeholder="请输入测试次数" v-model="form.testCount" class="border-bottom"></Input>

        <Cell class="marginTop" label="计费方式" required v-model="form.type" :list="devTypeList" />
        <Cell label="扫码套餐" @change="planChange" required v-model="form.planId" :list="weChatList" />
        <Cell label="套餐详情" isText :value="weChatInfo" :arrow="false" placeholder="" />

        <Cell class="marginTop" label="机型" required v-model="form.type" :list="termTypetList" />
        <Cell label="型号" v-model="form.model" :list="termModelList" />
        <Cell label="网络服务商" v-model="form.simType" :list="simTypeList" />
        <Cell label="接入方式" v-model="form.network" :list="netTypeList" />

        <Input label="资产编号" placeholder="请输入资产编号" v-model="form.dfNo" class="border-bottom marginTop"></Input>
        <Input label="备注" placeholder="备注信息" type="textarea" class="border-bottom" :rows="3" v-model="form.note"></Input>
    </div>
</template>
<script>
import { getDICT, weChartQr } from "@/services/common";
export default {
  name: "basicInfo",
  props: {
    form: Object
  },
  data() {
    return {
      placeInfo: {}, //场所详情
      terminalInfo: {}, //终端详情
      devTypeList: [], //计费方式
      weChatList: [], //扫码套餐
      weChatInfo: "", //微信套餐当前详情
      termTypetList: [], //机型
      termModelList: [], //型号
      simTypeList: [], //网络服务商
      netTypeList: [] //接入方式
    };
  },
  created() {
    this.devType(); //计费方式
    this.termTypet(); //机型
    this.termModel(); //型号
    this.simType(); //网络服务商
    this.netType(); //接入方式
    this.weChartTao(); //扫码套餐
  },
  methods: {
    //   场所
    placeChange(val) {
      this.form.placeId = val.id;
      this.form.planId = val.planId;
    },
    //   终端
    terminalChange(val) {
      delete val.ct;
      delete val.id;
      delete val.planId;
      Object.keys(val).forEach(key => {
        this.form[key] = val[key];
      });
    },
    // 计费方式
    async devType() {
      this.devTypeList = await getDICT("devType");
    },
    // 机型
    async termTypet() {
      this.termTypetList = await getDICT("termType");
    },
    // 型号
    async termModel() {
      this.termModelList = await getDICT("termModel");
    },
    // 网络服务商
    async simType() {
      this.simTypeList = await getDICT("simType");
    },
    // 接入方式
    async netType() {
      this.netTypeList = await getDICT("netType");
    },
    //扫码套餐
    async weChartTao() {
      this.weChatList = await weChartQr();
      this.weChatList.map(item => {
        if (item.id == this.form.planId) {
          this.weChatInfo = item.planInfo.replace(/#/g, " | ");
        }
      });
    },
    //微信套餐当前详情
    planChange({ planInfo = "" } = {}) {
      this.weChatInfo = planInfo.replace(/#/g, " | ");
    }
  }
};
</script>  

