export default {
    name: "coinRecordInfo",
    data() {
        return {
            item:{}
        }
    },
    created() {
        this.item = JSON.parse(this.$route.query.info);
    },
}