export default {
    name: "workingRecordInfo",
    data() {
        return {
            item:{}
        }
    },
    created() {
        this.item = JSON.parse(this.$route.query.info);
    },
}