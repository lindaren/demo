import { mapState } from "vuex";
import { Radio } from 'mint-ui'
export default {
    name: "code",
    components: {
        [Radio.name]: Radio
    },
    data() {
        return {
            data: "",
            userProp: 9,//用户性质
            options: [
                {
                    label: '商家',
                    value: 9
                },
                {
                    label: '合伙人',
                    value: 2
                }
            ]
        };
    },
    computed: mapState({
        users: state => state.transition.users
    }),
    created() {
        this.getcode();
    },
    watch: {
        userProp: {
            handler: function (val, oldVal) {
                if (val != oldVal) {
                    this.getcode();
                }
            },
            deep: true
        }
    },
    methods: {
        getcode() {
            this.data = '/fzweb/platform/login/getMcQrCode?userProp=' + this.userProp + '&width=180&height=180';
        }
    }
};