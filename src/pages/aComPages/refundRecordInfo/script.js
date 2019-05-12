import {ORDER_PAY_RECORE} from '@/utils/Interface';
export default {
    name: "refundRecordInfo",
    data() {
        return {
            item:{},
            orderList:[]
        }
    },
    async created() {
        this.item = JSON.parse(this.$route.query.info);
        let {data} = await this.$http({
            url:`${ORDER_PAY_RECORE}?orderSn=${this.item.mb_order_id}`,
        });
        this.orderList = data.data||[];
    },
}