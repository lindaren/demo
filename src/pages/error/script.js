import { GET_OPENID, WX_INFO } from "@/utils/Interface";
import QS from "querystring";
import utils from "@/utils/utils";
export default {
    name: "error",
    computed: {
        isLogin() {
            if (utils.isWeixin() && (this.status == 4012 || this.status == 4013)) {
                return true;
            }
            return false;
        },
        isHome() {
            if (!this.status == 4011 && !this.status == 4012) {
                return true;
            }
            return false;
        }
    },
    data() {
        return {
            url:
                "http://mis.fzminben.com/fzmc/#/accountLogin",
            status: 404,
            isLink: true,
            errors: {
                [0]: ["出错了!"],
                [404]: "404找不到资源！",
                [4011]: "您没有权限!",
                [4012]: "登录失效，请重新登录！",
                [4013]: "用户获取授权失败!"
            }
        };
    },
    async created() {
        let { status=404, isLink = true } = this.$route.query;
        this.status = +status;
        this.isLink = isLink;
    },
    methods: {
        toPage() {
            this.$router.replace({ name: "Home" });
        }
    }
};