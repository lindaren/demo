import { STORE_QUERY, TER_DELETE } from "@/utils/Interface";
export default {
    name: "terminalDelete",
    data() {
        return {
            storeList: [],//仓库
            form: {
                id: "",//设备id
                storeId: "",//仓库id
                note: "",//撤机原因
            },
            storeName:"",//仓库名称
            comAddr:'',//终端编号
            rules: {
                storeId: { required: true, message: '请选择存放仓库' },
                note: { required: true, message: '请输入撤机原因' },
            }
        }
    },
    created() {
        let { id = "",comAddr="" } = this.$route.query;
        this.form.id = id;
        this.comAddr = comAddr;
        this.storeQuery();//仓库列表
    },
    methods: {
        changValue(value){
            this.storeName=value.name;
        },
        // 仓库查询
        async storeQuery() {
            
            let { data } = await this.$http({
                url: STORE_QUERY,
            });
            let { data: { list = [] } = {} } = data;
            this.storeList = list;
        },//撤机
        async termDelete() {
            let result = await this.$refs.forms.validate();
            if (!result) return;
            this.$MessageBox.confirm("是否确认将终端编号"+this.comAddr+"，撤往"+this.storeName+"?")
                .then(async action => {
                    let result = await this.$refs.forms.validate();
                    if (!result) return;
                    this.$Indicator.open({ spinnerType: "fading-circle" });
                    let { data } = await this.$http({
                        url: TER_DELETE,
                        method: "post",
                        data: this.$QS.stringify(this.form)
                    });
                    this.$Indicator.close();
                    this.$Toast("撤机成功");
                    this.$store.commit('cache/refresh', 'terminalManage');
                    this.$router.go(-1);

                })
                .catch(e => { });
        },
    }

}