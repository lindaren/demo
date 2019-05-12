export default {
    name: "onLineSearchInfo",
    data() {
        return {
            item:{}
        }
    },
    created() {
        this.item = JSON.parse(this.$route.query.info);
    },
}