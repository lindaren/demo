import Vue from 'vue'
import { mapState } from "vuex";
import axios from 'axios';
import { SUMMARY, SUM_QUERY, SUM_SUMMARY, GETSUMMARY } from "@/utils/Interface";
import { Loadmore } from 'mint-ui';
import utils from '@/utils/utils';
export default {
    name: "home",
    components: {
        [Loadmore.name]: Loadmore,

    },
    data() {
        return {
            dayMoney: "0", //今日
            onlineTerm: "0",
            totalTerm: "0",
            todayRefund: "0",
            isLoading: true,
            imgUrl:
                "https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png",
            orders: [], //订单列表
            time: 0,
            user:""
        };
    },
    computed: mapState({
        realName: state => state.transition.realName
    }),
    async created() {
        this.user = utils.storage.getLocal('users').data.userProp;
        this.judgeMenu();
        await this.getSummary(1); //获取收益
        await this.getOnline(2); //获取收益
        this.interval = setInterval(() => {
            this.getSummary(1); //获取收益
            this.getOnline(2); //获取收益
        }, 300 * 1000);
    },
    deactivated() {
        clearInterval(this.interval)
    },
    methods: {
        // 判断菜单
        async judgeMenu() {
            await this.$store.dispatch("getMenu");//获取菜单
        },
        async loadTop() {
            let currTime = new Date().getTime();
            if (currTime - this.time >= 60000) {
                this.time = currTime;
                await this.getSummary(1); //获取收益
                await this.getOnline(2); //获取收益
            } else {
                this.$Toast("刷新频繁，请稍后再试");
                this.$refs.loadmore.onTopLoaded();
            }
        },
        //获取收益
        async getSummary(item) {
            try {
                let { data } = await this.$http({
                    url: GETSUMMARY + '/' + item
                })
                this.isLoading = false;
                let { data: { totalTerm, todayIncome, onlineTerm, todayRefund } = {} } = data;
                    this.dayMoney = todayIncome;
              
                this.$refs.loadmore.onTopLoaded();
            } catch (e) {
                this.isLoading = false;
                console.log(e)
            }
        },
        async getOnline(item){
            try {
                let { data } = await this.$http({
                    url: GETSUMMARY + '/' + item
                })
                this.isLoading = false;
                let { data: { totalTerm, todayIncome, onlineTerm, todayRefund } = {} } = data;
                    this.totalTerm = totalTerm;
                    this.onlineTerm = onlineTerm;
                this.$refs.loadmore.onTopLoaded();
            } catch (e) {
                this.isLoading = false;
                console.log(e)
            }
        },

        splitNumber(str, index) {
            return str.toFixed(2).split(".")[index];
        },
    }
};