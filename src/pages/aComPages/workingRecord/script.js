import { mapState } from "vuex";
import { RUN_QUERY } from "@/utils/Interface";
export default {
    name: "workingRecord",
    data() {
        return {
            URL: RUN_QUERY,
            sheetVisible: false,
            typeList:[
                {
                  id:'1',
                  name:'投币'
                },{
                  id:'2',
                  name:'计时'
                }
              ],
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "", //场所名称
                comAddr: "",//终端编号
                type: "",//记录类型
                beginDate: "",//统计日期(起)
                endDate: "",//统计日期(止)
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