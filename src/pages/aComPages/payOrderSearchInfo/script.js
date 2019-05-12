import { ORDER_PAY_RECORE, REFUND_ORDER, REMOTE_BOOT } from '@/utils/Interface';
import { mapState } from "vuex";
import { Picker } from 'mint-ui'
export default {
    name: "payOrderSearchInfo",
    components:{ 
        [Picker.name]:Picker
    },
    data() {
        return {
            item: {},
            orderList: [],
            isRefund: false,
            slots: [{
                flex: 1,
                values: ['试机退款', '客户退款'],
                className: 'slot1',
                textAlign: 'center'
            }],
            types: {
                '试机退款': '1',
                '客户退款': '2'
            },
            forms: {
                refundType: '1',
                orderId: ''
            }
        }
    },
    async created() {
        this.item = JSON.parse(this.$route.query.info);
        let { data } = await this.$http({
            url: `${ORDER_PAY_RECORE}?orderSn=${this.item.mb_order_id}`,
        });
        this.orderList = data.data || [];
    },
    computed: mapState({
        userPermission: state => state.transition.userPermission,
    }),
    methods: {
        async refund() {
            this.isRefund = true;
        },
        remote() {
            this.$MessageBox.prompt('请输入运行时间(分钟)').then(({ value, action }) => {
                if(~~value <=0){
                    return this.$Toast("请输入正整数!")
                }
                this.$MessageBox.confirm(`终端编号为:[${this.item.comAddr}]，将启动${~~value}分钟，是否启动？`)
                    .then(async () => {
                        this.$Indicator.open({ spinnerType: "fading-circle" });
                        let { data } = await this.$http({
                            url: REMOTE_BOOT,
                            method: "post",
                            data: this.$QS.stringify({
                                comAddr: this.item.comAddr,
                                type: 1,//远程启动
                                time: value,
                                orderId:this.item.mb_order_id
                            })
                        });
                        this.$Indicator.close();
                    }).catch(() => {

                    })
            });
        },
        async confirm() {
            this.forms.orderId = this.item.id;
            if (!this.forms.refundType) {
                return this.$Toast('请选择退款方式!')
            }
            let refundName = this.slots[0].values[(~~this.forms.refundType) - 1];
            this.$MessageBox.confirm(`退款方式为：【${refundName}】，是否退款？`)
                .then(async () => {
                    this.$Indicator.open({ spinnerType: "fading-circle" });
                    let { data } = await this.$http({
                        url: REFUND_ORDER,
                        method: 'post',
                        data: this.$QS.stringify(this.forms)
                    });
                    this.$Indicator.close();
                    this.$Toast('退款成功!');
                    this.$store.commit('cache/refresh', 'payOrderSearch')
                    this.$router.replace({ name: 'PayOrderSearch' });
                }).catch(() => {

                })
        },
        onValuesChange(e, values) {
            this.forms.refundType = this.types[values[0]];
        }
    }
}