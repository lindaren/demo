import { mapState } from "vuex";
import { CHANGE_QUERY } from "@/utils/Interface";
export default {
    name: "changeRecord",
    data() {
        return {
            URL: CHANGE_QUERY,
            sheetVisible: false,
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "", //场所名称
                comAddr: "",//终端编号
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
            this.loadData("search");
        }
    }
}