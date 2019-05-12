import { mapState } from "vuex";
import { ORDER_QUERY } from "@/utils/Interface";
export default {
    name: "payOrderSearch",
    data() {
        return {
            URL: ORDER_QUERY,
            sheetVisible: false,
            orderStatus:[{
                name:"未付款",
                id:"0"
            },{
                name:"已付款",
                id:"1"
            },{
                name:"已退款",
                id:"2"
            }],
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "", //场所名称
                comAddr: "",//终端编号
                status:"",
                orderId:"",
                mbOrderId:"",
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
            this.params.status="";
            this.params.orderId="";
            this.params.mbOrderId="";
            this.params.beginDate = '';
            this.params.endDate = '';
            this.loadData("search");
        },
        /**打开时间选择器 */
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