import { TODAY_DETAIL } from "@/utils/Interface";
import utils from '@/utils/utils'
import { Loadmore } from 'mint-ui';
export default {
    name: "InComeInfo",
    components: {
        'mt-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
    },
    data() {
        return {
            params: {
                pageNo: 0,
                pageSize:20
            },
            loading: false,
            allLoaded: false,
            showError: false,
            URL: TODAY_DETAIL,
            data: [],
            totalIncome:'',
            date:this.$route.query.beginDate

        };
    },
    created() {
        this.params.beginDate = this.$route.query.beginDate.replace(/-/g, '/');
        this.params.endDate = this.$route.query.endDate.replace(/-/g, '/');
        this.params.placeId = this.$route.query.placeId;
    },
    mounted() {
        // this.loadData()
    },

    methods: {
        async loadData() {
            let { data } = await this.$http({
                url: this.URL,
                params: this.params,
                headers: {
                    authorization: utils.storage.getLocal("authorization")
                }
            });
            // data.data.list=[]
            // 数据为空
            if (data.data.list.length == 0) {
                // 初次加载就无数据则显示暂无数据
                if (this.params.pageNo == 1) {
                    return (this.showError = true);
                } else {
                    // 数据已经全部加载完成
                    this.loading = true;
                    this.allLoaded = true;
                    return;
                }
            }
            this.allLoaded = false;
            // 拼接数据
            if (this.params.pageNo > 1) {
                this.data = this.data.concat(data.data.list);
            } else {
                // 首次加载的数据
                this.data = data.data.list;
            }
            if (data.data.list.length < this.pageSize) {
                this.loading = true;
                this.allLoaded = true;
            }
            this.totalIncome=data.data.totalIncome
        },
        more() {
            this.params.pageNo++;
            this.loadData();
        },
        // loadPageList() {
        //     this.params.pageNo = 1;
        //     this.loadData();
        //     this.loading = false;
        // },
        // loadTop: function () { //组件提供的下拉触发方法  
        //     //下拉刷新 
        //     this.loadPageList();
        //     this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        // },
        loadBottom: function () {
            // 上拉加载  
            this.more();// 上拉触发的分页查询  
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
    }
};