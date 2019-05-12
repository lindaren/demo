import { BIND_WX } from "@/utils/Interface";
import QS from "querystring";
export default {
    name: "login",
    data() {
        return {
            phone: "",
            username: "",
            oriWinHeight: window.innerHeight
        };
    },
    created() {
        this.event();
    },
    methods: {
        //确定绑定
        async bindWx() {
            let { data } = await this.$http({
                method: "post",
                url: BIND_WX,
                data: this.$QS.stringify({
                    phone: this.phone,
                    username: this.username
                })
            });
            let { code, msg } = data;
            if (code != 0) {
                this.$Toast({
                    message: msg,
                    position: "bottom",
                    duration: 2000
                });
            } else {
                await this.$store.dispatch("doLogin", {
                    type: "bind",
                    $router: this.$router
                });
            }
        },
        focus() {
            if (!this.$refs.content || !this.$refs.logo) {
                return;
            }
            this.$refs.content.className += " transformTop";
            this.$refs.logo.className += " transformTop";
        },
        blur() {
            if (!this.$refs.content || !this.$refs.logo) {
                return;
            }
            this.$refs.content.className = this.$refs.content.className.replace(
                /transformTop/g,
                " "
            );
            this.$refs.logo.className = this.$refs.logo.className.replace(
                /transformTop/g,
                " "
            );
        },
        event() {
            window.addEventListener("resize", this.onResize);
        },
        onResize() {
            let newHeight = window.innerHeight;
            if (this.oriWinHeight - newHeight > 50) {
                this.focus();
            } else if (this.oriWinHeight === newHeight) {
                this.blur();
            }
        }
    },
    destroy() {
        window.removeEventListener("resize", this.onResize);
    }
};