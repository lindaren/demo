import { QUERY_USERINFO ,QUERY_USERINFO_NEW} from "@/utils/Interface";
import { mapState } from "vuex";
import QS from "querystring";
export default {
    name: "userInfo",
    data() {
        return {
            username: "",//姓名
            phone: "",//联系方式
            userPropName: "",//用户类型
            ct: "",//创建时间
            userProp: "",//用户类型
        };
    },
    computed: mapState({
        realName: state => state.transition.realName,
        users: state => state.transition.users,
    }),
    async created() {
        await this.userInfo();
    },
    methods: {
        //  获取用户信息
        async userInfo() {
            let { data } = await this.$http({
                // url: QUERY_USERINFO,
                url:QUERY_USERINFO_NEW,
                params: {
                    // q: this.realName
                    id: this.users.data.id
                }
            });
            let { code, data: { rows = [] } = {} } = data;
            // if (rows.length == 1) {
                // let list = rows[0];
                let list = data.data;
                this.username = list.username;
                this.phone = list.phone;
                this.userPropName = (list.coperatorProp == '1' ? '业务' : (list.coperatorProp == '2' ? '管理' : '无'));
                this.ct = list.ct;
                this.userProp = list.userProp;
            // }
        },
        // 退出登录
        loginOut() {
            this.$MessageBox
                .confirm("退出后将无法查看数据")
                .then(action => {
                    this.$store.dispatch('loginOut');
                })
                .catch(e => { });
        },
    }
};