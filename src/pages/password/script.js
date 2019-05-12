import { CHANGE_PWD,CHANGE_PWDRE } from "@/utils/Interface";
import { mapState } from "vuex";
export default {
    name: "password",
    data() {
        return {
            data: {
                oldPwd: "",
                newPwd: "",
                confirmPwd:"",
                newPwd:"",
                id: ""
            }
        };
    },
    computed: mapState({
        users: state => state.transition.users,
        Password:state=>state.transition.Password
    }),
    created() {
       
     },
    methods: {
        //修改密码
        async changePwd() {
            this.data.id = this.users.data.id;
            this.data.oldPwd = this.data.oldPwd;
            this.data.newPwd = this.data.newPwd;
            if(this.data.oldPwd==this.data.newPwd){
                return this.$Toast("新密码与旧密码不能相同！")
            }
            this.$Indicator.open({ spinnerType: "fading-circle" });
            let { data } = await this.$http({
                url: CHANGE_PWD,
                method: "post",
                data: this.$QS.stringify(this.data)
            });
            this.$Indicator.close();
            this.$Toast("修改成功");
            this.$store.dispatch('loginOut');
        },
        async changeRePwd(){
            if(this.data.newPwd!=this.data.confirmPwd){
                return this.$Toast("新密码与确认密码不一致！")
            }
    
            this.data.userId=this.Password.userId
            
            let {data}=await this.$http({
                url:CHANGE_PWDRE,
                method:"post",
                data:this.$QS.stringify(this.data)
            })
            this.$Indicator.close();
            this.$Toast("重置成功");
            this.$store.dispatch('loginOut');
        }
    }
};