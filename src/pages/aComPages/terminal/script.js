import { mapState } from "vuex";
import { TER_QUERY } from "@/utils/Interface";
import { getDICT } from '@/services/common';
import { Actionsheet } from 'mint-ui'
export default {
    name: "terminalManage",
    components: {
        [Actionsheet.name]: Actionsheet
    },
    data() {
        return {
            URL: TER_QUERY,
            sheetVisible: false,
            placeList: [],
            statusList: [{
                name: '已撤机',
                id: 1
            }, {
                name: '无信号',
                id: 2
            }, {
                name: '无支付',
                id: 3
            }, {
                name: '长期未支付',
                id: 4
            }, {
                name: '正常',
                id: 5
            }],//终端状态
            chargeWayList: [],//结算方式
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                comAddr: "",//终端
                level: "",//终端状态
                billType: "",//结算方式
                placeId: "",
            },
        }
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    created() {
        this.initStatus();
        let { id } = this.$route.query;
        this.params.placeId = id;
    },
    methods: {
        /*新增终端 */
        addList() {
            this.$router.push({ name: "TerminalManageAdd" });
        },
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
        async initStatus() {
            //结算方式
            this.chargeWayList = await getDICT('chargeWay');
        },
        dlCls({ tstatus }) {
            let isDelete = tstatus == 5;
            return {
                "primary-color": !isDelete,
                "delete-line": isDelete,
            }
        },
        reset() {
            this.params.comAddr = '';
            this.params.level = '';
            this.params.billType = '';
            this.params.placeId = '';
            this.loadData("search");
        },
        // 撤机
        deleteCurrent({ id, tstatus, comAddr }) {
            if (tstatus == 5) {
                this.$Toast('已撤机');
            } else {
                this.$router.push({ name: 'TerminalManageDelete', query: { id: id, comAddr: comAddr } });
            }
        },
        // 终端修改
        editTerm({ id, tstatus }) {
            if (tstatus == 5) {
                this.$Toast('已撤机，不可修改！');
            } else {
                this.$router.push({ name: 'TerminalManageAdd', query: { id: id } });
            }
        },
        // 终端换板
        changeTerm({ id, tstatus, comAddr, wxBase }) {
            if (tstatus == 5) {
                this.$Toast('已撤机，不可换板！');
            } else {
                this.$router.push({ name: 'TerminalChange', query: { id: id, comAddr: comAddr, wxBase: wxBase } });
            }
        },
    }
}