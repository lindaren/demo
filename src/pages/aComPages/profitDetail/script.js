import { mapState } from "vuex";
import { CHANGE_QUERY } from "@/utils/Interface";
export default {
    name: "ProfitDetail",
    data() {
        return {
            URL: CHANGE_QUERY,
            sheetVisible: false,
            params: {
                page: 0,
                totalCount: '...',
                rows: 20,
                qry_name: "", //场所名称
                comAddr: "",//终端编号
            },
            orders:[{comaddr: "11111",placename:'福建省厦门市同安区',create_time:'2018-09-11',total_fee:'333',orderStatus:'1',id:'1'},
            {comaddr: "22222",placename:'福建省厦门市同安区',create_time:'2018-08-11',total_fee:'333',orderStatus:'2',id:'2'},
            {comaddr: "333333",placename:'福建省厦门市同安区',create_time:'2018-07-11',total_fee:'333',orderStatus:'3',id:'3'},
            {comaddr: "444444",placename:'福建省厦门市同安区',create_time:'2018-06-11',total_fee:'333',orderStatus:'4',id:'4'}]
        }
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    created() {

    },
    methods: {
        loadSearchData() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            this.params.page = 1;
            this.loadData("search");
        },
        loadData(...args) {
            this.$refs.datas && this.$refs.datas.reload(...args);
        },
        //筛选条件提交
        submit() {
            this.$refs.drawer.toggle(false);
            this.params.page = 1;
            this.loadData("search");
        },
        //滚动回调
        scrollChange({ params = {} }) {
            this.params = params;
            this.$nextTick(() => {
                // $('.fy-com-text-right').css({'color':'#e84b14','fontSize':'18px'})
                // $('.fy-p-right').append('<p class="right">元</p>')
                // $('.right').css({'fontSize':'12px','marginLeft':'3px','marginTop':'8px'})
                // $('.fy-p-right').css({'display':'flex'})
            })
        },
        reset() {
            this.params.comAddr = '';
            this.params.qry_name = '';
            this.loadData("search");
        }
    },
    mounted() {

    }
}