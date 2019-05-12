
import { INCOME_LIST, INCOME_PLACE, Search_PLACE } from "@/utils/Interface";
import { Loadmore, InfiniteScroll, Search } from 'mint-ui';
import utils from '@/utils/utils'
export default {
    name: "inComeShow",
    components: {
        'mt-loadmore': Loadmore, // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
    },
    data() {
        return {
            params:{},
            loading: false,
            allLoaded: false,
            dataList: [],
            detailList:[]
        };
    },
    created() {
        
    },
    activated(){
        if(this.$route.params.placeId){
            this.params = JSON.parse(this.$route.params.placeId);
        }
        this.loadDetailData(true);
    },
    methods: {
        more() {
            this.params.pageNo += 1;
            this.loadDetailData(true);

        },
        loadPageList() {
            this.params.pageNo = 1;
            this.loadDetailData(true);
        },
        loadTop: function () { //组件提供的下拉触发方法  
            this.loadPageList();
            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
        },
        loadBottom: function () {
            this.more();// 上拉触发的分页查询  
            this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
            console.log('dd')
        },
          // 明细
          async loadDetailData(isLoad) {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            try {
                this.params.placeId = ""
                let { data } = await this.$http({
                    url: INCOME_PLACE,
                    params: this.params,
                    headers: {
                        authorization: utils.storage.getLocal("authorization")
                    }
                });
                if (data.data.list == 0) {
                    this.$Toast("没有更多数据了！")
                } else {
                    if (this.params.pageNo > 1) {
                        this.detailList = this.detailList.concat(data.data.list)
                    } else {
                        this.detailList = data.data.list
                    }
                }

            } catch (e) {
                
            } finally {
                this.$Indicator.close();
            }
        },
    },

};