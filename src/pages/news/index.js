
export default {
    name: "opinion",
    data() {
        return {
            form: {
                page: 0,
                rows: 20,
                image: "",
                info: ""
            },
            headerType: [{ id: 1, name: "个人消息", select: "ye" }, { id: 2, name: "活动通知", select: "no" }, { id: 3, name: "系统公告", select: "no" }],
            news: []
        };
    },
    created() {
        this.getData(1)
    },
    mounted() { },
    methods: {
        // refresh() {
        //     this.params.page = 1;
        //     this.loadData("search");
        // },
        // loadSearchData() {
        //     this.params.page = 1;
        //     this.loadData("search");
        // },
        // loadData(...args) {
        //     this.$refs.datas && this.$refs.datas.reload(...args);
        // },
        // //滚动回调
        // scrollChange({ params = {} }) {
        //     this.params = params;
        // },
        switcher(item) {
            this.headerType.map(type => {
                if (type.id == item.id) {
                    type.select = "ye";
                } else {
                    type.select = "no";
                }
                return type;
            })
            this.getData(item.id);
        },
        getData(id){
            if(id=='1'){
                this.news=[{ name: "您有一份礼物待领取", time: "2018-07-10", info: "您有一份礼物待领取！您有一份礼物待领取您有一份礼物待领取！您有一份礼物待领取，您有一份礼物待领取！您有一份礼物待领取" }, { name: "您有一份礼物待领取", time: "2018-07-10", info: "您有一份礼物待领取！您有一份礼物待领取您有一份礼物待领取！您有一份礼物待领取，您有一份礼物待领取！您有一份礼物待领取" }];
            }else if(id=="2"){
                this.news=[{ name: "您有一份礼物待领取2", time: "2018-07-10", info: "您有一份礼物待领取！您有一份礼物待领取您有一份礼物待领取！您有一份礼物待领取，您有一份礼物待领取！您有一份礼物待领取" }, { name: "您有一份礼物待领取", time: "2018-07-10", info: "您有一份礼物待领取！您有一份礼物待领取您有一份礼物待领取！您有一份礼物待领取，您有一份礼物待领取！您有一份礼物待领取" }];
            }else{
                this.news=[{ name: "您有一份礼物待领取3", time: "2018-07-10", info: "您有一份礼物待领取！您有一份礼物待领取您有一份礼物待领取！您有一份礼物待领取，您有一份礼物待领取！您有一份礼物待领取" }, { name: "您有一份礼物待领取", time: "2018-07-10", info: "您有一份礼物待领取！您有一份礼物待领取您有一份礼物待领取！您有一份礼物待领取，您有一份礼物待领取！您有一份礼物待领取" }];
            }
        }
    }
};