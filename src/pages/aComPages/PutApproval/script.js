import { mapState } from "vuex";
import { PUT_LIST, PLACE_DELETE,PUT_SUBMIT_DO,PUT_GONG_CANCELA } from "@/utils/Interface";
import { getDICT } from '@/services/common';
import { Actionsheet } from 'mint-ui'
export default {
    name: "putApproval",
    components:{ 
        [Actionsheet.name]:Actionsheet
    },
    data() {
        return {
            URL: PUT_LIST,
            sheetVisible: false,
            placeList: [],
            actions: [{
                name: '修改合同',
                method: this.editCon
            }, {
                name: '提交审核',
                method: this.sunbmitCurrent
            }, {
                name: '撤销申请',
                method: this.cancelCurrent
            }],
            statusList: [],//审核
            belongList: [{
                name: '本人',
                id: 1
            }, {
                name: '他人',
                id: 2
            }],//归属
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "",//名称
                aduitStatus: "",//审核状态
                qry_belong: "",//归属
            },
            currentId: null,//当前id
        }
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    created() {
        this.initStatus();
        this.permission();//按钮权限
    },
    methods: {
        permission(){
            this.actions=this.actions.filter((item)=>{
                if(item.name=="修改合同"&&this.userPermission.indexOf('maintenance.putApproval.editContract')>=0){
                    return true;
                }
                if(item.name=="提交审核"&&this.userPermission.indexOf('maintenance.putApproval.submit')>=0){
                    return true;
                }
                if(item.name=="撤销申请"&&this.userPermission.indexOf('maintenance.putApproval.cancel')>=0){
                    return true;
                }
            });
        },
        /*新增投放 */
        addList() {
            this.$router.push({ name: "PutApprovalAdd" });
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
            //审核状态
            this.statusList = await getDICT('aduitStatus');
        },
        aduCls({ aduit_status }) {
            let isSuccess = aduit_status == 2 || aduit_status == 5;
            let isError = aduit_status == 3;
            return {
                "primary-color-bg": !isSuccess,
                "success-color-bg": isSuccess,
                "error-color-bg": isError
            }
        },
        reset() {
            this.params.aduitStatus = '';
            this.params.qry_belong = '';
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
        // 更多操作
        moreActions(id,status) {
            if(status==2){
                this.$Toast("终审已通过，不可再次操作！");
                return
            }
            this.sheetVisible = true;
            this.currentId = id;
        },
        // 提交审核
        sunbmitCurrent() {
            this.$MessageBox.confirm("确定提交?")
                .then(action => {
                    this.submitApproval();
                })
                .catch(e => { });
        },
        async submitApproval() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: PUT_SUBMIT_DO,
                method: "post",
                data: this.$QS.stringify({
                    placeId:this.currentId
                })
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.loadData("search");
        },
        // 撤销申请
        cancelCurrent() {
            this.$MessageBox.confirm("确定撤销?")
                .then(action => {
                    this.cancelApproval();
                })
                .catch(e => { });
        },
        async cancelApproval() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: PUT_GONG_CANCELA,
                method: "post",
                data: this.$QS.stringify({
                    id:this.currentId
                })
            });
            this.$Indicator.close();
            this.$Toast("撤销成功");
            this.loadData("search");
        },
        // 基本信息修改
        editBasic(id){
            this.$router.push({name:'PutApprovalAdd',query:{describe:'basic',id:id}});
        },
        // 合同修改
        editCon(){
            this.$router.push({name:'PutApprovalAdd',query:{describe:'contract',id:this.currentId}});
        }
    }
}