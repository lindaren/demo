import { QUERY_USER, DELETE_USER, UNBIND_USER ,RESET_PWD } from "@/utils/Interface";
import utils from '@/utils/utils'
import { Actionsheet } from 'mint-ui'
import { mapState } from "vuex";
export default {
    name: "userManage",
    components: {
        [Actionsheet.name]: Actionsheet
    },
    data() {
        return {
            sheetVisible: false,
            actions: [{
                name: '删除',
                method: this.dropHandler
            }, {
                name: '重置密码',
                method: this.resetPwdHandler
            }],
            currItem:null,
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                sc: ''
            },
            URL: QUERY_USER
        };
    },
    created() {
        this.permission();//按钮权限
        
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    methods: {
        permission(){
            this.actions=this.actions.filter((item)=>{
                if(item.name=="删除"&&this.userPermission.indexOf('partner.delete')>=0){
                    return true;
                }
                if(item.name=="重置密码"&&this.userPermission.indexOf('partner.reset')>=0){
                    return true;
                }
            });
        },
        loadSearchData() {
            this.params.page = 1;
            this.loadData("search");
        },
        RefreshHandler() {
            this.params.sc = "";
            this.loadSearchData();
        },
        loadData(...args) {
            this.$refs.datas && this.$refs.datas.reload(...args);
        },
        //滚动回调
        scrollChange({ params = {} }) {
            this.params = params;
        },
        //分配场所
        bindPlace({ id: userId }) {
            this.$router.push({ name: "BindPlace", query: { userId } });
        },
        //新增用户
        addPerson() {
            this.$router.push({ name: "AddPerson" });
        },
        // 编辑用户
        editHandler(user) {
            this.$router.push({
                name: "AddPerson",
                query: { user: JSON.stringify(user) }
            });
        },
        // 解绑函数
        async unBindUser(id) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: UNBIND_USER,
                method: "post",
                data: this.$QS.stringify({
                    userId: id
                })
            });
            this.$Indicator.close();
            this.$Toast("解绑成功");
            await this.triggerClick();
        },
        //解绑
        unbindHandler(id, value) {
            if (value == "未绑定") {
                this.$Toast("该用户未绑定，无需解绑");
                return;
            }
            this.$MessageBox
                .confirm("是否解绑?")
                .then(action => {
                    this.unBindUser(id);
                })
                .catch(e => { });
        },
        // 删除函数
        async deleteUser(id) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: DELETE_USER,
                method: "post",
                data: this.$QS.stringify({
                    userId: id
                })
            });
            this.$Indicator.close();
            this.$Toast("删除成功");
            await this.triggerClick();
        },
        //删除
        dropHandler() {
            this.$MessageBox
                .confirm("是否删除此用户?")
                .then(action => {
                    this.deleteUser(this.currItem.id);
                })
                .catch(e => { });
        },
        //重置密码
        resetPwdHandler(){
            this.$MessageBox
                .confirm("是否重置此用户密码?")
                .then(action => {
                    this.resetPwd(this.currItem.id);
                })
                .catch(e => { });
        },
        async resetPwd(id){
            await this.$http({
                url:RESET_PWD,
                method:'post',
                data:this.$QS.stringify({
                    ids:id
                })
            })
            this.$Toast("重置成功！")
        },
        //操作弹框
        showAction(item) {
            this.currItem = item ;
            this.sheetVisible = true;
        },
        triggerClick() {
            if (this.$refs.rebtn) {
                this.$refs.rebtn.triggerClick();
            } else {
                this.$nextTick(() => {
                    this.$refs.rebtn.triggerClick();
                });
            }
        },
        tagCls({ coperatorProp }) {
            return {
                'blue-tag': coperatorProp == 1,
                'oran-tag': coperatorProp == 2,
                'black-tag': coperatorProp == 0
            }
        }
    }
};