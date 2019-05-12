import { STORE_QUERY, TER_CHANGECARD } from "@/utils/Interface";
import { getDICT } from "@/services/common";
export default {
    name: "terminalChange",
    data() {
        return {
            note: "",//撤机原因
            storeList: [],//仓库
            chgCardErrorList: [],//换板故障
            form: {
                termId: "",
                comAdd1: "",//旧板卡编号
                comAdd2: "",//新板卡编号
                coin1: "",//旧板币值
                coin2: "",//新板币值
                storeId: "",//仓库id
                note: "",//备注
                errorType: "",//换板故障
            },
            rules: {
                comAdd2: { required: true, message: '请选择新板卡编号' },
                coin2: [{ required: true, message: '请输入新板币值' }, {
                    type: 'integer', min: 0, message: '请确定输入的为数字', transform(value) {
                        return +value
                    }
                }],
                errorType: { required: true, message: '请选择换板故障' },
            }
        }
    },
    created() {
        let { id = "", comAddr = "", wxBase = "" } = this.$route.query;
        this.form.termId = id;
        this.form.comAdd1 = comAddr;
        this.form.coin1 = wxBase;
        this.storeQuery();//仓库列表
        this.changeError();//换板故障
    },
    methods: {
        //  新办卡编号 终端
        terminalChange({ comAddr }) {
            this.form.comAdd2 = comAddr;
        },
        // 仓库查询
        async storeQuery() {
            let { data } = await this.$http({
                url: STORE_QUERY,
            });
            let { data: { list = [] } = {} } = data;
            this.storeList = list;
        },
        // 换板故障
        async changeError() {
            this.chgCardErrorList = await getDICT("chgCardError");
        },//撤机
        termChange() {
            this.$MessageBox.confirm("确定换板?")
                .then(async action => {
                    let result = await this.$refs.forms.validate();
                    if (!result) return;
                    this.$Indicator.open({ spinnerType: "fading-circle" });
                    let { data } = await this.$http({
                        url: TER_CHANGECARD,
                        method: "post",
                        data: this.$QS.stringify(this.form)
                    });
                    this.$Indicator.close();
                    this.$Toast("换板成功");
                    this.$store.commit('cache/refresh', 'terminalManage');
                    this.$router.go(-1);

                })
                .catch(e => { });
        },
    }

}