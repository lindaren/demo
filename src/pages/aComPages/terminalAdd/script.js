import { TER_RET, TER_ADD_DO, TER_EDIT } from "@/utils/Interface";
import BasicInfo from './basicInfo.vue';
import { basic, form, getRules } from './params';
export default {
    name: "terminalAdd",
    data() {
        return {
            form: form(),
            id: "",
            rules: getRules()
        }
    },
    created() {
        let { id } = this.$route.query;
        this.id = id;
        this.termInfo();
    },
    components: {
        BasicInfo
    },
    methods: {
        //终端管理编辑
        async termInfo() {
            if (this.id) {
                this.form.placeVisible = true;
                let { data } = await this.$http({
                    url: TER_RET,
                    params: { id: this.id }
                });
                let { data: list = [] } = data;
                let info = list;
                this.form.id = info.id;
                Object.keys(basic).forEach((key) => {
                    this.form[key] = info[basic[key]];
                });
                delete this.form.testCount;
            }
        },
        async submit() {
            let result = await this.$refs.forms.validate();
            if (!result) return;
            if (this.id) {
                this.editSubmit();
            } else {
                this.addSubmit();
            }
        },
        // 新增提交
        async addSubmit() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: TER_ADD_DO,
                method: "post",
                data: this.$QS.stringify(this.form)
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.$store.commit('cache/refresh', 'terminalManage');
            this.$router.go(-1);

        },
        //修改终端信息
        async editSubmit() {
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: TER_EDIT,
                method: "post",
                data: this.$QS.stringify(this.form)
            });
            this.$Indicator.close();
            this.$Toast("提交成功");
            this.$store.commit('cache/refresh', 'terminalManage');
            this.$router.go(-1);
        },
    }

}