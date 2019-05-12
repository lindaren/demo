import { PUT_HISTORY } from "@/utils/Interface";
export default {
    name: "putApprovalDetail",
    data() {
        return {
            item: {},
            historyArr: [],//审核历史
        }
    },
    created() {
        this.merchantChain();
        this.approHistory();
    },
    methods: {
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
        //审核历史
        async approHistory() {
            let { data } = await this.$http({
                url: PUT_HISTORY,
                params: {
                    aduitType: 1,//审核工单类型
                    placeId: this.item.id,//场所id
                }
            });
            let { code, data: { list = [] } = {} } = data;
            this.historyArr = list;
            this.historyArr.map(item => {
                if (item.opt == '初审通过' || item.opt == '终审通过' || item.opt == '审核通过(不发货)') {
                    item.color = 'green';
                } else if (item.opt == '审核不通过') {
                    item.color = 'red';
                }

            });
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
    }
}