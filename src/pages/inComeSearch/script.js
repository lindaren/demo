import XCell from "mint-ui/packages/cell/index.js";
import { SUM_PLACELIST } from "@/utils/Interface.js";
import utils from '@/utils/utils'
export default {
    name: "inComeSearch",
    data() {
        return {
            result: [],
            value: "",
            deLoadData:null
        };
    },
    components: { XCell },
    created() {
    },
    methods: {
        async change() {
            if (this.value.length >= 2) {
                if(!this.deLoadData){
                    this.deLoadData = utils.debounce(this.loadData, 1000);
                }
                this.deLoadData();
            }
        },
        async loadData() {
            let { data } = await this.$http({
                url: SUM_PLACELIST,
                params: {
                    qry_name: this.value,
                    page: 1,
                    rows: 20
                }
            });
            this.result = data.data;
        },
        itemClick(item) {
            let {name} = this.$route.query;
            if(name=='order'){
                this.$store.commit("order/queryItem", item);
            }else{
                this.$store.commit("inCome/queryItem", item);
            }
            this.$router.go(-1);
        },
        cancel() {
            this.$router.go(-1);
        }
    }
};