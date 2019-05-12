import { DICT, PLA_WATCH } from "@/utils/Interface";
import utils from '@/utils/utils'
import { Loadmore } from 'mint-ui'
export default {
    name: "userDetail",
    components:{ 
        [Loadmore.name]:Loadmore
    },
    data() {
        return {
            username: "",
            userType: "1",
            phone: "",
            userTypeList: [],//业务、管理
            item: {},
            userProp: "",
            placeList: [],//被授权场所
            placeValue: "",
            totalBarFixed: false,
            bottomPullText: "",
            isLoading: true,
            deLoadData: null,
            params: {
                page: 1,
                totalCount: 0,
                rows: 20
            },
            visible: false
        };
    },
    created() {
        this.userTypeP();
        let { user } = this.$route.query;
        if (user) {
            this.item = JSON.parse(user) || null;
            if (this.item) {
                this.placeHave();
                return this.editUser();
            }
            this.item = {};
        }
    },
    methods: {
        clear() {
            this.placeValue= "";
            this.placeInput();
        },
        async loadBottom() {
            let { page, totalCount, rows } = this.params;
            if (page * rows < totalCount) {
                this.params.page++;
                this.bottomPullText = "上拉加载更多";
                return await this.placeHave('loadBottom', this.onBottomLoaded);
            }
            this.$refs.loadmore.onBottomLoaded();
            this.bottomPullText = "没有更多了";
        },
        onBottomLoaded() {
            this.$refs.loadmore.onBottomLoaded();
        },
        onScrollToped() {
            setTimeout(() => {
                this.$refs.scroll.scrollTop = 0;
            }, 0);
        },
        //   编辑用户
        editUser() {
            this.username = this.item.name;
            this.userType = this.item.coperatorProp;
            this.phone = this.item.phone;
            this.userProp = this.item.userProp;
        },
        //合伙/商家类型
        async userTypeP() {
            let { data } = await this.$http({
                url: DICT,
                params: {
                    code: "coperatorType"
                }
            });
            let { data: list = {} } = data;
            this.userTypeList = list;
        },
        async placeInput() {
            this.params.page = 1;
            this.bottomPullText = "";
            if (!this.deLoadData) {
                this.deLoadData = utils.debounce(this.placeHave, 1000);
            }
            this.deLoadData();
        },
        // 授权场所查看
        async placeHave(result, callback) {
            let { page, rows } = this.params;
            let { data } = await this.$http({
                url: PLA_WATCH,
                params: {
                    userId: this.item.id,
                    grantPageNo: page,
                    grantPageSize: rows,
                    grantKey: this.placeValue

                }
            });
            this.isLoading = false;
            let { data: { granted = [], totalGrant } = {} } = data;
            this.params.totalCount = totalGrant;
            if (result !== "loadBottom") {
                this.placeList = granted;
            } else {
                this.placeList = this.placeList.concat(granted);
            }
            callback && callback();
        }
    }
};