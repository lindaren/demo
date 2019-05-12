export default {
    name: "changeRecordInfo",
    data() {
        return {
            item:{}
        }
    },
    created() {
        this.item = JSON.parse(this.$route.query.info);
    },
}