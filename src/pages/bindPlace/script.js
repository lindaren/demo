import { PLA_BIND, PLA_GRANT } from "@/utils/Interface";
import FyTransfer from "@/component/Transfer/index.vue";
import utils from '@/utils/utils';
export default {
    name: "bindPlace",
    data() {
        return {
            value: [],
            leftData: [],
            rightData: [],
            titles: ["未分配（最多30条）", "已分配"],
            loading: true,
            deLoadData:null,
            params: {
                userId: "",
                ungrantPageNo: 1, //分页
                ungrantPageSize: 30, //未分配分页
                grantPageSize:1000,
                ungrantKey: "" //未分配搜索条件
            }
        };
    },
    components: { FyTransfer },
    created() {
        let { userId } = this.$route.query;
        this.params.userId = userId;
        this.loadData();
    },
    methods: {
        cancel() {
            this.$router.go(-1);
        },
        submit() {
            let users = this.$store.state.transition.users;
            if (users) {
                let { userProp = "" } = users.data || {};
                this.$MessageBox
                    .confirm("确认分配场所?")
                    .then(action => {
                        this.confirm(userProp);
                    })
                    .catch(e => { });
                return;
            }
            this.$Toast("获取用户信息失败，请重新登录!");
        },
        async confirm(userProp) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: PLA_GRANT,
                method:"post",
                data: this.$QS.stringify({
                    placeIds: this.value.map(({ id }) => id).join(","),
                    userId: this.params.userId,
                    userProp
                })
            });
            this.$Indicator.close();
            this.$Toast("分配完成!");
            this.$router.go(-1);
        },
        tranSearch({ type, text }) {
            if (type == 0) {
                this.params.ungrantKey = text;
                this.params.ungrantPageNo = 1;
                if(!this.deLoadData){
                    this.deLoadData = utils.debounce(this.loadData, 500);
                }
                this.deLoadData("search");
            }
        },
        async loadData(type) {
            let { data } = await this.$http({
                url: PLA_BIND,
                params: this.params
            });
            let { data: { ungrant = [], granted = [], totalGrant, totalUngrant } = {} } = data;
            this.loading = false;
            this.leftData = ungrant;
            /**搜索 */
            if (type !== "search") {
                this.value = granted;
                this.rightData = granted.map(item => {
                    item.tag = "已分配";
                    return item;
                });
            }
        }
    }
};