import { mapState } from "vuex";
import { REMOTE_QUERY } from "@/utils/Interface";
export default {
    name: "remoteRecord",
    data() {
        return {
            URL: REMOTE_QUERY,
            sheetVisible: false,
            typeList: [
                {
                    id: '1',
                    name: '远程启动'
                }, {
                    id: '2',
                    name: '远程复位'
                }
            ],
            timeValue: "",
            isActive: 4,
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "", //场所名称
                comAddr: "",//终端编号
                type: "",//操作类型
                beginDate: "",
                endDate: ""
            }
        }
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    created() {
    },
    methods: {
        loadSearchData() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            this.params.page = 1;
            this.loadData("search");
        },
        loadData(...args) {
            this.$refs.datas && this.$refs.datas.reload(...args);
        },
        //筛选条件提交
        submit() {
            this.$refs.drawer.toggle(false);
            this.params.page = 1;
            this.loadData("search");
        },
        //滚动回调
        scrollChange({ params = {} }) {
            this.params = params;
        },
        reset() {
            this.params.comAddr = '';
            this.params.qry_name = '';
            this.params.type = '';
            this.params.beginDate = '';
            this.params.endDate = '';
            this.loadData("search");
        },
        dateChange(value) {
            if (value.length > 0) {
                this.params.beginDate = value[0];
                this.params.endDate = value[1];
                return;
            }
            this.params.beginDate = "";
            this.params.endDate = "";
        }
    }
}