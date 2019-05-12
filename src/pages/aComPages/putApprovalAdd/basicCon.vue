<template>
    <div>
        <BasicInfo :form="form" />
        <BusinCell label="商家" v-model="form.lastMerchant" class="marginTop" />
        <Input label="投放数量(台)" placeholder="请输入申请台数" v-model="form.signCount" v-required class="border-bottom"></Input>
        <Cell v-if="form.showSwitch" label="生成物流单" isText :arrow="false">
            <mt-switch class="pull-right" :value="form.needLog==1" @change="switchChange"></mt-switch>
        </Cell>
        <Cell label="结算方式" class="marginTop" v-model="form.billType" @change="billChange" required :list="billTypeList" />
        <Input v-if="form.billType==2 || form.billType==5" label="商家分成(%)" placeholder="请输入商家分成" @input="storeRateChange" v-required class="border-bottom" :value="form.storeRate"></Input>
        <Input v-if="form.billType==2 || form.billType==5" label="我司分成(%)" placeholder="请输入我司分成" @input="rateChange" v-required class="border-bottom" :value="form.rate"></Input>
        <Input v-if="form.billType==1" label="场地租金(元/月)" placeholder="请输入场地租金" v-required class="border-bottom" v-model="form.rent"></Input>
        <Input v-if="form.billType==2||form.billType==1 || form.billType==5" label="场地押金(元)" placeholder="请输入场地押金" class="border-bottom" v-model="form.reward"></Input>
        <Input v-if="form.billType==3" label="设备租金(元/月)" placeholder="请输入设备租金" v-required class="border-bottom" v-model="form.rent"></Input>
        <Input v-if="form.billType==3" label="设备押金(元)" placeholder="请输入设备押金" class="border-bottom" v-model="form.reward"></Input>
        <Input v-if="form.billType==4" label="代理费(%)" placeholder="请输入代理费" class="border-bottom" v-model="form.agentRate"></Input>

        <!-- <Input label="收款人" placeholder="请输入收款人" class="marginTop border-bottom" v-model="form.receiver"></Input>
        <Input label="开户行" placeholder="请输入开户行" class="border-bottom" v-model="form.bank"></Input>
        <Input label="账号" placeholder="请输入账号" class="border-bottom" v-model="form.account"></Input> -->

        <BankCell label="开户行" v-model="form.bank" class="marginTop" required :placeholder="form.bank.length == 0?'请选择开户行':form.bank" />
        <Input label="支行" placeholder="请输入支行" class="border-bottom" v-required v-model="form.subBank"></Input>
        <Input label="收款人" placeholder="请输入收款人" class="border-bottom" v-required v-model="form.receiver"></Input>
        <Input label="账号" placeholder="请输入账号" class="border-bottom" v-required v-model="form.account"></Input>

         <Input label="营业执照编号" placeholder="请输入营业执照编号" class="marginTop border-bottom" v-required v-model="form.businessNum"></Input>
        <Input label="结算联系人" placeholder="请输入结算联系人" class="border-bottom" v-required v-model="form.settleName"></Input>
        <Input label="联系人电话" placeholder="请输入联系人电话" class="border-bottom" v-required v-model="form.telephone"></Input>
        <Input label="合同方名称" placeholder="请输入合同方名称" class="border-bottom" v-model="form.ctname"></Input>
        <Cell v-model="form.beginDate" label="合同开始日期" isText @rightClick="openPicker(0)" required/>
        <Cell v-model="form.endDate" label="合同结束日期" isText @rightClick="openPicker(1)" required/>
        <!-- 上传 -->
        <ImageCell label="合同附件" v-model="form.images" :fileLen="30" />
        <mt-datetime-picker ref="picker" v-model="timeValue" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="confirmTime" @cancel="cancel">
        </mt-datetime-picker>
    </div>
</template>
<script>
import { getDICT } from "@/services/common";
import { DatetimePicker, Switch } from "mint-ui";

export default {
  name: "basicCon",
  components: {
    [DatetimePicker.name]: DatetimePicker,
    [Switch.name]: Switch
  },
  props: {
    form: Object,
    billTypeList:Object
  },
  data() {
    return {
    //   billTypeList: [], //结算方式
      timeValue: "", //日期弹框
      isActive: 4,
      describe: ""
    };
  },
  created() {
    let { describe } = this.$route.query;
    this.describe = describe;
    // this.getBillType(); //结算方式
  },
  methods: {
    switchChange() {
      this.form.needLog = this.form.needLog == 1 ? 0 : 1;
    },
    /**打开时间选择器 */
    openPicker(index) {
      this.isActive = index;
      this.timeValue = new Date();
      this.$refs.picker.open();
    },
    // 时间确定按钮
    confirmTime() {
      if (this.isActive == 0) {
        this.form.beginDate = new Date(this.timeValue).Format("yyyy-MM-dd");
      } else if (this.isActive == 1) {
        this.form.endDate = new Date(this.timeValue).Format("yyyy-MM-dd");
      }
    },
    // 时间取消按钮
    cancel() {
      if (this.isActive == 0) {
        this.form.beginDate = this.form.beginDate;
      } else if (this.isActive == 1) {
        this.form.endDate = this.form.endDate;
      }
    },
    // 结算方式更改
    billChange() {
      if (this.form.billType == 1) {
        this.form.agentRate = null;
        this.form.storeRate = null;
        this.form.rate = null;
      } else if (this.form.billType == 2 || this.form.billType == 5) {
        this.form.agentRate = null;
        this.form.rent = null;
        this.form.storeRate = 40;
        this.form.rate = 60;
      } else if (this.form.billType == 3) {
        this.form.agentRate = null;
        this.form.storeRate = null;
        this.form.rate = null;
      } else if (this.form.billType == 4) {
        this.form.storeRate = null;
        this.form.rate = null;
        this.form.reward = null;
        this.form.rent = null;
        this.form.agentRate = 3;
      }
    },
    // 商家分成更改
    storeRateChange(val) {
      this.form.storeRate = val;
      this.form.rate = val < 100 ? 100 - val : 0;
    },
    // 我司分成更改
    rateChange(val) {
      this.form.rate = val;
      this.form.storeRate = val < 100 ? 100 - val : 0;
    },
    // //结算方式
    // async getBillType() {
    //   this.billTypeList = await getDICT("chargeWay");
    // },
  }
};
</script>  

