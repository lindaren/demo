export default {
    name: "terminalDetail",
    data() {
        return {
            item: {},
        }
    },
    created() {
        let { item } = this.$route.query;
            this.item = JSON.parse(item);
    },
    methods: {
        dlCls({tstatus}) {
            let isDelete = tstatus == 5;
            return {
                "primary-color": !isDelete,
                "delete-line": isDelete,
            }
        },
    }
}