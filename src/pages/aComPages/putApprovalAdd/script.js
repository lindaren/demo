import { PUT_ADD, EDIT_BASE, PUT_EDIT_CON } from "@/utils/Interface";
import { editPlaceInfo, getDICT } from "@/services/common";
import BasicInfo from './basicInfo.vue';
import BasicCon from './basicCon.vue';
import { basic, contract, form, getRules } from './params';
export default {
    name: "putApprovalAdd",
    data() {
        return {
            form: form(),
            describe: "",
            id: "",
            billTypeList: [],
            billTypeList1: [],
            billType: []
        }
    },
    watch: {
        ['form.signCount'](count) {
            this.form.showSwitch = (+count > +this.form.oldCount);
        }
    },
    computed: {
        rules() {
            return getRules(this.form.billType, this.describe);
        }
    },
    created() {
        let { describe, id } = this.$route.query;
        this.describe = describe;
        this.id = id;
        this.placeInfo();
        this.getBillType();
    },
    components: {
        BasicInfo,
        BasicCon
    },
    methods: {
        //投放编辑
        async placeInfo() {
            if (this.id) {
                let infoFlag = await editPlaceInfo(this.id);

                // 其他信息
                let info = infoFlag.place;
                this.form.id = info.id;
                this.form.company = info.company;
                if (this.describe == 'basic') {
                    Object.keys(basic).forEach((key) => {
                        this.form[key] = info[basic[key]];
                    });

                    if (info.cooperator && info.cooperator.id) {
                        this.form.lastCoperator = { id: info.cooperator.id, username: info.cooperator.username };//合伙
                    }
                    this.form.salesman = info.salesman.username;//业务人员
                    this.form.operatorName = info.operatorName;//经办人
                    this.form.prop = info.prop;

                    if (info.province) {
                        this.form.allCity = [];
                        this.form.allCity.push(info.province);
                        info.city && this.form.allCity.push(info.city);
                        info.county && this.form.allCity.push(info.county);
                    }
                    this.form.needLog = 0;
                }
                if (this.describe == 'contract') {
                    Object.keys(contract).forEach((key) => {
                        this.form[key] = info[contract[key]];
                    });
                    // 开户行信息
                    this.form.bank = infoFlag.billingMessage.bank;
                    this.form.subBank = infoFlag.billingMessage.subBank;
                    this.form.receiver = infoFlag.billingMessage.receiver;
                    this.form.account = infoFlag.billingMessage.account;
                    this.form.bankId = infoFlag.billingMessage.bankId;
                    if (info.beginDate) {
                        this.form.beginDate = info.beginDate.split(" ")[0];//合同开始日期
                    }
                    if (info.endDate) {
                        this.form.endDate = info.endDate.split(" ")[0];//合同结束日期
                    }
                    this.form.needLog = 0;
                }
            }
        },
        getParams() {
            let province = "",
                city = "",
                county = "",
                lastCoperator = "",
                lastMerchant = "",
                images = "";
            if (this.describe != 'contract') {
                province = this.form.allCity[0];
                city = this.form.allCity[1];
                county = this.form.allCity[2];
                lastCoperator = this.form.lastCoperator != null ? this.form.lastCoperator.id : "";
            }
            if (this.describe != 'basic') {
                if (this.form.lastMerchant && this.form.lastMerchant.length > 0) {
                    lastMerchant = this.form.lastMerchant.map(item => item.value ? item.value : item.id).join(",");
                }
                if (this.form.images && this.form.images.length > 0) {
                    images = this.form.images.map(val => val.url ? val.url : val.path).join(",");
                }
            }
            let bank = "";
            if (isNaN(this.form.bank)) {
                bank = this.form.bank;
                this.form.bank = this.form.bankId;
                this.form.bankId = bank;
            }

            let parasm = {
                ...this.form,
                province,
                city,
                county,
                lastCoperator,
                lastMerchant,
                images
            }
            delete parasm.salesman;
            return parasm
        },
        async submit() {
            let result = await this.$refs.forms.validate();
            if (!result) return;
            if (this.describe == 'basic') {
                this.basicSubmit();
            } else if (this.describe == 'contract') {
                this.contractSubmit();
            } else {
                this.addSubmit();
            }
        },
        // 新增提交
        async addSubmit() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: PUT_ADD,
                method: "post",
                data: this.$QS.stringify(this.getParams())
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.$store.commit('cache/refresh', 'putApproval');
            this.$router.go(-1);

        },
        //修改基本信息
        async basicSubmit() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: EDIT_BASE,
                method: "post",
                data: this.$QS.stringify(this.getParams())
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.$store.commit('cache/refresh', 'putApproval');
            this.$router.go(-1);
        },
        //修改合同信息
        async contractSubmit() {

            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: PUT_EDIT_CON,
                method: "post",
                data: this.$QS.stringify(this.getParams())
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.$store.commit('cache/refresh', 'putApproval');
            this.$router.go(-1);
        },
        company(value) {
            if (value.id == 1) {
                this.billType = this.billTypeList1;
            } else {
                this.billType = this.billTypeList;
            }
        },
        //结算方式
        async getBillType() {
            let billTypeList = await getDICT("chargeWay");
            this.billTypeList = [];
            this.billTypeList.push(billTypeList[3]);
            this.billTypeList.push(billTypeList[4]);
            this.billTypeList1 = [];
            this.billTypeList1.push(billTypeList[0]);
            this.billTypeList1.push(billTypeList[1]);
            this.billTypeList1.push(billTypeList[2]);
            let that = this;
            setTimeout(function () {
                if (that.form.company == 1) {
                    that.billType = that.billTypeList1;
                }else{
                    that.billType = that.billTypeList;
                }
            }, 100)

        },
    }

}