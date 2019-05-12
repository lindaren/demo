export default {
    namespaced: true,
    state: {
        beginDate: "",
        endDate: "",
        queryItem: ""
    },
    mutations: {
        queryItem(state, queryItem) {
            state.queryItem = queryItem;
        },
        reset(state) {
            state.beginDate = "";
            state.endDate = "";
            state.queryItem = "";
        },
        beginDate(state, beginDate) {
            state.beginDate = beginDate;
        },
        endDate(state, endDate) {
            state.endDate = endDate;
        }
    }
}

