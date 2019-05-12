import { ADD_USER, DICT, EDIT_USER } from "@/utils/Interface";
import { mapState } from "vuex";
export default {
    name: "addPerson",
    data() {
        return {
            username: "",
            userType: "1",
            phone: "",
            userTypeList: [],
            item: {},
            userProp: "2"
        };
    },
    computed: mapState({
        users: state => state.transition.users
    }),
    created() {
        this.userTypeP();
        let { user } = this.$route.query;
        if (user) {
            this.item = JSON.parse(user) || null;
            if (this.item) {
                return this.editUser();
            }
            this.item = {};
        }
    },
    methods: {
        //   编辑用户
        editUser() {
            this.username = this.item.name;
            this.userType = this.item.coperatorProp;
            this.phone = this.item.phone;
            this.userProp = this.item.userProp;
        },
        async submit() {
            if (this.username.length < 2) {
                this.$Toast("用户名不得少于两个字");
                return false;
            }
            if (!/^\d{11}$/.test(this.phone.replace(/\s/g, ""))) {
                this.$Toast("手机号码有误，请重填");
                return false;
            }
            this.$Indicator.open({ spinnerType: "fading-circle" });
            if (this.item.id) {
                await this.userChange(EDIT_USER);
            } else {
                await this.userChange(ADD_USER);
            }
        },
        //新增修改用户
        async userChange(url) {
            let { data } = await this.$http({
                url: url,
                method: "post",
                data: this.$QS.stringify({
                    username: this.username.replace(/\s/g, ""),
                    coperatorProp: this.userType,
                    phone: this.phone.replace(/\s/g, ""),
                    userProp: this.userProp,
                    id: this.item.id ? this.item.id : ""
                })
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.$store.commit('cache/refresh', 'userManage');
            this.$router.go(-1);
        },
        //合伙/商家类型
        async userTypeP() {
            let { data } = await this.$http({
                url: DICT,
                params: {
                    code: "coperatorType"
                }
            });
            let { data: list = {} } = data;
            this.userTypeList = list;
        }
    }
};