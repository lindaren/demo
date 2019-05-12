import Vue from 'vue'
import { mapState } from "vuex";
import { MINBEN_INCOME, ORDER_QUERY } from "@/utils/Interface";
import { Loadmore } from 'mint-ui'
export default {
    name: "comHome",
    components: {
        [Loadmore.name]: Loadmore
    },
    data() {
        return {
            weekMoney: "0", //本周
            weekMoneyPoint: "00",
            dayMoney: "0", //今日
            dayMoneyPoint: "00",
            monthMoney: "0", //本月
            monthMoneyPoint: "00",
            isLoading: true,
            imgUrl:
                "https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png",
            orders: [], //订单列表
            time: 0,
            PlaceManage: false,//场所管理
            PutApproval: false,//投放申请
            Terminal: false,//终端管理
            Search: false,//综合查询
            orders: [], //订单列表
            menuList: [{
                title: "场所",//显示的标题
                name: "场所管理",//menu名称
                route: "PlaceManage",//路由名称
                src: require('../../../../static/imgs/icon_place.png')//图片路径
            }, {
                title: "终端",
                name: "终端管理",
                route: "TerminalManage",
                src: require('../../../../static/imgs/icon_terminal.png')
            }, {
                title: "投放",
                name: "投放申请",
                route: "PutApproval",
                src: require('../../../../static/imgs/icon_put_approval.png')
            }, {
                title: "综合",
                name: "综合查询",
                route: "Comprehensive",
                src: require('../../../../static/imgs/icon_search.png')
            }]
        };
    },
    computed: mapState({
        realName: state => state.transition.realName,
        userPermission: state => state.transition.userPermission,
        menuNames(state) {
            let menu = state.transition.menu;
            return menu.map(({ name }) => name);
        },
        isHome() {
            return this.userPermission.indexOf('sys.index') !== -1
        }
    }),
    created() {
        // if (this.isHome) {
            this.getSummary(); //获取收益
        // }
        this.getOrder(); //获取订单
        this.judgeMenu();
    },
    methods: {
        // 判断菜单
        async judgeMenu() {
            await this.$store.dispatch("getMenu");//获取菜单
        },
        //判断菜单是否存在
        isMenu(name) {
            return this.menuNames.indexOf(name) !== -1;
        },
        loadTop() {
            let currTime = new Date().getTime();
            if (currTime - this.time >= 60000) {
                this.time = currTime;
                this.getSummary(); //获取收益
                this.judgeMenu(); //菜单
            } else {
                this.$Toast("刷新频繁，请稍后再试");
                this.$refs.loadmore.onTopLoaded();
            }
        },
        //获取收益
        async getSummary() {
            let { data } = await this.$http({
                url: MINBEN_INCOME,
                timeout: 60 * 1000
            });
            let { data: { income_today, income_week, income_month } = {} } = data;
            this.dayMoney = this.splitNumber(income_today, 0);
            this.dayMoneyPoint = this.splitNumber(income_today, 1);
            this.weekMoney = this.splitNumber(income_week + income_today, 0);
            this.weekMoneyPoint = this.splitNumber(income_week + income_today, 1);
            this.monthMoney = this.splitNumber(income_month + income_today, 0);
            this.monthMoneyPoint = this.splitNumber(income_month + income_today, 1);
            this.$refs.loadmore.onTopLoaded();
        },
        //获取订单
        async getOrder() {
            try {
                
                let { data } = await this.$http({
                    url: ORDER_QUERY,
                    params: {
                        page: 1,
                        rows: 5,
                    }
                });
                let { data: { list = [] } = {} } = data;
                this.orders = list;
                this.isLoading = false;
            } catch (e) {
                this.isLoading = false;
            }

        },
        splitNumber(str, index) {
            return str.toFixed(2).split(".")[index];
        }
    }
};