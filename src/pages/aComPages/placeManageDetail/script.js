import { mapState } from "vuex";
export default {
    name: "placeManageDetail",
    data() {
        return {
            item: {},
            historyArr: [],//审核历史
        }
    },
    created() {
        this.merchantChain();
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
        isUserPer(state){
            let userPermission=state.transition.userPermission;
            return userPermission.indexOf('term.place.contractView')>=0;
        },
    }),
    methods: {
        toTerPage() {
            let { id } = this.item;
            this.$store.commit('cache/refresh', 'terminalManage');
            this.$router.push({ name: "TerminalManage", query: { id } });

        },
        // 修造商家
        merchantChain() {
            let { item } = this.$route.query;
            this.item = JSON.parse(item);
            this.userS = "";
            if (this.item.users.length != 0) {
                let userArr = [];
                this.item.users.map(val => {
                    userArr.push(val.username);
                });
                this.item.userS = userArr.join(",");
            }
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
    }
}