import { PLAGE } from "@/utils/Interface";
export default {
    name: "place",
    data() {
        return {
            URL: PLAGE,
            params: {
                pageNo: 1,
                pageSize: 20,
                placeName:""
            },
            totalCount:"..."
        };
    },
    created() {
    },
    mounted() { },
    methods: {
        refresh() {
            this.params.pageNo = 1;
            this.loadData("search");
        },
        loadSearchData() {
            this.params.pageNo = 1;
            this.loadData("search");
        },
        loadData(...args) {
            this.$refs.datas && this.$refs.datas.reload(...args);
        },
        //滚动回调
        scrollChange({ params = {} }) {
            this.totalCount=params.totalCount;
        },
    }
};