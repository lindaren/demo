import { mapState } from "vuex";
import { LOGIN } from "@/utils/Interface";
import QS from "querystring";
import { Spinner } from 'mint-ui'
export default {
    name: "adminLogin",
    components:{ 
        [Spinner.name]: Spinner
     },
    data() {
        return {
            password: "",
            username: "",
            oriWinHeight: window.innerHeight,
            eyeUrl: "",
            eyeIndex: 1,
            pwdType: ''
        };
    },
    created() {
        this.event();
        this.eyeClick();
    },
    methods: {
        //确定绑定
        async bindWx() {
            await this.$store.dispatch("doLogin", { route: 'AdminLogin', username: this.username, password: this.password });
        },
        focus() {
            if (!this.$refs.content || !this.$refs.logo) { return }
            this.$refs.content.className += " transformTop";
            this.$refs.logo.className += " transformTop";
        },
        blur() {
            if (!this.$refs.content || !this.$refs.logo) { return }
            this.$refs.content.className = this.$refs.content.className.replace(/transformTop/g, " ");
            this.$refs.logo.className = this.$refs.logo.className.replace(/transformTop/g, " ");
        },
        event() {
            window.addEventListener('resize', this.onResize);
        },
        onResize() {
            let newHeight = window.innerHeight;
            if (this.oriWinHeight - newHeight > 50) {
                this.focus();
            } else if (this.oriWinHeight === newHeight) {
                this.blur();
            }
        },
        //眼睛变换
        eyeClick() {
            this.eyeUrl = this.eyeIndex % 2 === 0 ? require('../../../static/imgs/eopen.svg') : require('../../../static/imgs/ecolse.svg')
            this.pwdType = this.eyeIndex % 2 === 0 ? 'text' : 'password'
            this.eyeIndex++;
        }
    },
    destroy() {
        window.removeEventListener('resize', this.onResize);
    }
};