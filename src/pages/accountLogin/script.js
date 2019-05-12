import { mapState } from "vuex";
import { LOGIN, CHANGE_CHECK } from "@/utils/Interface";
import QS from "querystring";
import $router from '@/router/index';
import { Spinner } from 'mint-ui'
export default {
    name: "adminLogin",
    components: {
        [Spinner.name]: Spinner
    },
    data() {
        return {
            password: "",
            phone: "",
            phoneCode: "",
            verification: "",
            oriWinHeight: window.innerHeight,
            eyeUrl: "",
            eyeIndex: 1,
            pwdType: '',
            showFirst: true,
            showSend: false,
            time: '获取验证码', //倒计时 
            currentTime: 61,
            disable: false,
            interval: "",
            timeId: 1
        };
    },
    created() {
        this.event();
        this.eyeClick();
    },
    methods: {
        async getVerify({ commit }) {
            if (!this.phoneCode || !this.verification) {
                return this.$Toast('账号验证码不能为空!');
            } else if (this.phoneCode.length!="11") {
                return this.$Toast('请输入正确的手机号码!');
            }
            await this.$store.dispatch("Password", { phoneCode: this.phoneCode, verification: this.verification });

        },
        //确定绑定
        async bindWx() {
            if (!this.phone || !this.password) {
                return this.$Toast('账号密码不能为空!');
            }
            await this.$store.dispatch("doLogin", { type: 'accountLogin', phone: this.phone, password: this.password });
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
            this.eyeUrl = this.eyeIndex % 2 === 0 ? require('../../../static/imgs/eopen.svg') : "http://ossadv.fjminben.com/res/a0001.svg"
            this.pwdType = this.eyeIndex % 2 === 0 ? 'text' : 'password'
            this.eyeIndex++;
        },
        resetPassword() {
            this.showFirst = false;
            this.showSend = true;
        },
        returnPa() {
            this.showFirst = true;
            this.showSend = false;
        },
        // 获取验证码
        getSend() {
            var that = this
            if (this.phoneCode.length == '0') {
                return this.$Toast('请输入手机号码');

            } else if (this.phoneCode.length!="11") {
                return this.$Toast('请输入正确的手机号码');
            }
            if (this.disable) {
                return;
            }
            this.reServer()
        },
        // 向服务端发送验证码
        async reServer() {
            let {data} = await axios({
                url: CHANGE_CHECK,
                method: "post",
                data: QS.stringify({
                    phone: this.phoneCode
                })
            })
            this.$Toast(data.msg);
            if(data.code=='0'){
                this.getCode();
            }
            
        },
        // 获取验证码倒计时
        getCode: function () {
            var that = this;
            if (this.disable) {
                return;
            }
            var currentTime = this.currentTime
            this.interval = setInterval(function () {
                currentTime--;
                that.time = currentTime + '秒',
                    that.disable = true;
                that.timeId = '0';
                if (currentTime <= 0) {
                    clearInterval(that.interval)
                    that.disable = false;
                    that.time = '重新发送';
                    that.currentTime = 61;
                    that.disabled = false;
                    that.timeId = '1';
                }
            }, 1000)
        },
    },

    destroy() {
        window.removeEventListener('resize', this.onResize);
    }
};