import { mapState } from "vuex";
import { LIST, PLACE_DELETE } from "@/utils/Interface";
import { getDICT } from '@/services/common';
import { Actionsheet } from 'mint-ui'
export default {
    name: "placeManage",
    components:{ 
        [Actionsheet.name]:Actionsheet
    },
    data() {
        return {
            URL: LIST,
            sheetVisible: false,
            placeList: [],
            statusList: [],//审计
            chargeWayList: [],//结算方式
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "",//名称
                isComplete: "",//审核状态
                billType: "",//结算方式
            },
        }
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    created() {
        this.initStatus();
    },
    methods: {
        /*新增场所 */
        addList() {
            this.$router.push({ name: "PlaceManageAdd" });
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
            //审计状态 结算方式
            let [statusList,chargeWayList] = await Promise.all([getDICT('completeStatus'),getDICT('chargeWay')]);
            this.statusList = statusList;
            this.chargeWayList=chargeWayList;
        },
        aduCls({ isComplete }) {
            let isSuccess = isComplete == 2;
            let isError = isComplete == 3 || isComplete == 1;
            return {
                "primary-color-bg": !isSuccess,
                "success-color-bg": isSuccess,
                "error-color-bg": isError
            }
        },
        reset() {
            this.params.isComplete = '';
            this.params.billType = '';
            this.params.qry_name = '';
            this.loadData("search");
        },
        // 删除
        deleteCurrent(id) {
            this.$MessageBox.confirm("确定删除?")
                .then(action => {
                    this.sureDelete(id);
                })
                .catch(e => { });
        },
        async sureDelete(id) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: PLACE_DELETE,
                method: "post",
                data: this.$QS.stringify({
                    id
                })
            });
            this.$Indicator.close();
            this.$Toast("删除成功");
            this.loadData("search");
        },
        // 基本信息修改
        editBasic(id){
            this.$router.push({name:'PlaceManageAdd',query:{describe:'basic',id:id}});
        },
        // 合同修改
        editCon(id){
            this.$router.push({name:'PlaceManageAdd',query:{describe:'contract',id:id}});
        }
    }
}