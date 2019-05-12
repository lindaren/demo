
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
            type: [{ id: 1, name: "程序bug", select: "no" }, { id: 2, name: "内容意见", select: "no" }, { id: 3, name: "网络问题", select: "no" }, { id: 4, name: "功能建议", select: "no" }, { id: 5, name: "其他", select: "no" }],
            selUrl: "../../../static/imgs_new/icon_se.png",
            noUrl: "../../../static/imgs_new/icon_no.png",
            typeShow: false,
            headerType: [{ id: 1, name: "意见反馈", select: "ye" }, { id: 2, name: "历史记录", select: "no" }],
            feedback:true,
            history: false,
            historyArr: [{ name: "请输入你的意见或建议请输入你的意见或建议请输入你的意见或建议？", time: "2018-06-30 13:02:54",
             img: ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
              "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
              "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
              "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
              "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg"
            ] ,endTime:"2018-06-30 13:02:54",askName:"请输入你的意见或建议请输入你的意见或建议请输入你的意见或建议？"},{ name: "请输入你的意见或建议请输入你的意见或建议请输入你的意见或建议？", time: "2018-06-30 13:02:54",
            img: ["http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
             "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
             "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
             "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg",
             "http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg"
           ] ,endTime:"2018-06-30 13:02:54",askName:"请输入你的意见或建议请输入你的意见或建议请输入你的意见或建议？"}]
        };
    },
    created() {
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
        gitItem(item, index) {
            this.type.map(type => {
                if (type.id == item.id) {
                    type.select = "ye";
                } else {
                    type.select = "no";
                }
                return type;
            })
            this.typeShow = true
        },
        submit() {
            if (this.form.image == "" && this.form.info == "" && !this.typeShow) {
                this.$Toast("请输入或者选择需要反馈的内容");
                return;
            }
        },
        switcher(item) {
            this.headerType.map(type => {
                if (type.id == item.id) {
                    type.select = "ye";
                } else {
                    type.select = "no";
                }
                return type;
            })
            if (item.id == "1") {
                this.feedback = true;
                this.history = false;
            } else {
                this.feedback = false;
                this.history = true;
            }
        }
    }
};