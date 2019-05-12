import { mapState } from "vuex";
import { TERM_NEW, TRT_PALCE, TERM_TERM_STATUS } from "@/utils/Interface";
import termStatus from "@/utils/termStatus.json";
import utils from '@/utils/utils';
export default {
    name: "terminal",
    data() {
        return {
            params: {
                pageNo: 1,
                pageSize: 20,
                termNo: "",
                totalCount: '...',
                placeName: "",
                subPlaceName: "",
                placeId: "",
                status: ""
            },
            total: "",
            fault: "",
            online: "",
            offline: "",
            showSe: false,
            URL: TERM_NEW,
            name: [],
            imgUrl: require("../../../static/imgs_new/down.png"),
            sc: "",
            totalArr: [],
            placeholder: "",
            errArr: termStatus.RECORDS,
            flagId: "",
            time:"请求数据中..."
        };
    },
    created() {
        if (!this.$route.query.length) {
            this.params.placeId = "";
            this.name = [{ id: 1, name: "场所名称", select: "ye" }, { id: 2, name: "子场所名称", select: "no" }, { id: 3, name: "终端编号", select: "no" }];
            this.placeholder = "请输入场所名称";
        } else {
            this.params.placeId = this.$route.query;
            this.name = [{ id: 2, name: "子场所名称", select: "no" }, { id: 3, name: "终端编号", select: "no" }];
            this.placeholder = "请输入子场所名称";
        }
    },
    methods: {
        refresh() {
            this.params.pageNo = 1;
            this.loadData("search");
        },
        loadData(...args) {
            this.$refs.datas && this.$refs.datas.reload(...args);
        },
        loadSearchData() {
            this.params.pageNo = 1;
            if (this.name[0].id == "1") {
                this.params.placeName = this.sc;
                this.params.subPlaceName = "";
                this.params.termNo = "";
            } else if (this.name[0].id == "2") {
                this.params.subPlaceName = this.sc;
                this.params.placeName = "";
                this.params.termNo = "";
            } else {
                this.params.termNo = this.sc;
                this.params.placeName = "";
                this.params.subPlaceName = "";
            }
            this.loadData("search");
        },
        //滚动回调
        scrollChange(params) {
            var arr = [];
            arr.push({ name: "总数", data: params.data.data.total, id: '0', se: "ye", nameEn: "total" }, { name: "在线", data: params.data.data.online, id: 1, se: "no", nameEn: "online" },{ name: "离线", data: params.data.data.offline, id: 3, se: "no", nameEn: "offline" }, { name: "故障", data: params.data.data.fault, id: 2, se: "no", nameEn: "fault" })
            if (this.totalArr.length == '0') {
                this.totalArr = arr;
            } else {
                this.totalArr[0].data = params.data.data.total;
                this.totalArr[1].data = params.data.data.online;
                this.totalArr[2].data = params.data.data.offline;
                this.totalArr[3].data = params.data.data.fault;
            }

        },
        showSelect() {
            if (!this.showSe) {
                this.showSe = true;
                this.imgUrl = require("../../../static/imgs_new/up.png");
            } else {
                this.showSe = false;
                this.imgUrl = require("../../../static/imgs_new/down.png");
            }
        },
        getSelect(item, index) {
            this.name.map(type => {
                if (type.id == item.id) {
                    type.select = 'ye';
                    this.placeholder = "请输入" + type.name
                } else {
                    type.select = 'no';
                }
            });
            this.name.splice(index, 1);
            this.name.unshift(item)
            this.showSe = false;
            this.imgUrl = require("../../../static/imgs_new/down.png");
        },
        getState(item) {
            this.params.status = item.id;
            this.totalArr.map(type => {
                if (type.id == item.id) {
                    type.se = 'ye';
                } else {
                    type.se = 'no';
                }
            });
            this.loadData();
        },
        async lookDetails(type, item, flagId) {
            this.flagId == "" || this.flagId != type ? this.flagId = type : this.flagId = "";
            this.time = "请求数据中..."
            if (flagId != type) {
                try {
                    let { data } = await this.$http({
                        url: TERM_TERM_STATUS + type,
                        headers: {
                            'authorization': utils.storage.getLocal('authorization')
                        }
                    })
                    if(item == '离线'){
                        this.time = "离线时间："+JSON.parse(data.data.redisJson).htime;
                    }else{
                        this.time = "心跳时间："+JSON.parse(data.data.redisJson).htime;
                    }
                    
                } catch (e) {
                    this.time = "未查询到相关的信息";
                }

            }
        }
    }
};