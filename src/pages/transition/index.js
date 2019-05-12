import axios from '@/utils/request';
import {
    LOGIN, RSA_KEY, WX_MENU, CHANGE_CHECKCODE,LOGIN_LIMITS
} from '@/utils/Interface';
import { Toast } from 'mint-ui';
import utils from '@/utils/utils';
import { RSAKeyPair, encryptedString } from '@/utils/Rsa';
import QS from 'querystring';
import $router from '@/router/index';
import $store from '@/model/index';
import { install, setContext } from '@/raven.js'
const { storage, is, attrData, Indicator } = utils;
export default {
    // 状态
    state: initState(),
    //放操作state 使用commit 触发 同步
    mutations: {
        clearAllStorage(state) {
            initState(state);
        },
        userPermission(state, userPermission) {
            state.userPermission = userPermission;
            storage.setLocal('userPermission', userPermission || "");
        },
        isRaven(state, value) {
            state.isRaven = value;
        },
        menu(state, menu) {
            state.menu = menu;
            storage.setLocal('menu', menu);
        },
        isLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        users(state, users) {
            if (!users) users = { data: {} };
            state.users = users;
            storage.setLocal('users', users);
        },
        Password(state, password) {
            state.Password = password;
            storage.setLocal('Password', password);
        },
        realName(state, realName) {
            state.realName = realName;
            storage.setLocal('realName', realName);
        },
        loginInfo(state, loginInfo) {
            if (!loginInfo) loginInfo = { username: "", phone: "", password: "" };
            state.loginInfo = loginInfo;
            storage.setLocal('loginInfo', loginInfo);
        },
        toHome({ users = {}, loginInfo }) {
            let { data: { username, userProp } = {} } = users;
            if (!userProp) {
                return $router.replace({ name: 'AccountLogin' });
            }
            if (userProp == 9 || userProp == 2 || userProp == 4) {
                return $router.replace({ name: 'Home' })
            } else if (userProp == 1) {
                return $router.replace({ name: 'ComHome' })
            } else {
                $store.commit('clearAllStorage');
                //不是商家合伙人
                return $router.replace({ name: 'error', query: { status: 4011 } })
            }
        }
    },
    actions: {
        //退出登录
        loginOut({ commit }) {
            commit('clearAllStorage');
            $router.replace({ name: 'AccountLogin' });
        },
        // 获取菜单
        async getMenu({ state, commit }) {
            let { data } = await axios({
                url: WX_MENU
            });
            let { data: { menu = [], userPermission = "" } = {} } = data;
            let { username, userProp, wxName } = state.users.data;
            commit('menu', menu);
            commit('userPermission', userPermission);
            let { isRaven, users } = state;
            if (!isRaven) {
                setContext(users.data || {});
                commit('isRaven', true);
            }
        },
        //登录
        async doLogin({ commit, state }, { route, username = "", password = "", phone = "", automatic }) {
            if (state.isLogin) { return }
            automatic && utils.Toast('自动登录中...');
            commit('isLogin', true);
            // 获取RSAkey
            async function fetchRSAKey(pwd) {
                try {
                    let { data } = await axios({
                        url: RSA_KEY,
                    });
                    let { data: { publicKeyExponent = "", publicKeyModulus = "" } } = data;
                    let key = new RSAKeyPair(publicKeyExponent, "", publicKeyModulus);
                    pwd = encryptedString(key, pwd.trim().split("").reverse().join(""));
                    let initialPwd = encryptedString(key, '123456'.split("").reverse().join(""));
                    let pwdObject = { pwd, initialPwd };
                    return pwdObject;
                } catch (e) {
                    commit('isLogin', false);
                    utils.Toast(`获取RSAKey失败，刷新页面重试`);
                }
            }
            async function getLimit(id){
                let {data} = await axios({
                    url:LOGIN_LIMITS,
                    method:"post",
                    data:QS.stringify({uid:id})
                })
                return data;
            }
            try {
                let { pwd, initialPwd } = await fetchRSAKey(password);
                let { data } = await axios({
                    method: 'post',
                    url: LOGIN,
                    data: QS.stringify({
                        username: username.trim(),
                        password: pwd,
                        phone: phone.trim(),
                    })
                });
                
                commit('isLogin', false);
                let { code, msg } = data;
                if (code == 0) {
                    storage.setLocal('authorization', data.data.APP_USER);
                    let userLimit = await getLimit(data.data.id)
                    //刷新全局缓存
                    commit('cache/refresh');
                    //保存账号密码
                    commit('loginInfo', { username, phone, password });
                    //保存用户信息
                    commit('users', userLimit);
                    let { data: { username: $username, userProp, isBind = "" } } = userLimit;
                    commit('realName', $username);
                    commit('toHome');
                    if (isBind == -1) {
                        setTimeout(() => {
                            utils.Toast(`您还未绑定场所，请联系您的业务人员`);
                        }, 5000);
                    }
                    if (pwd == initialPwd) {
                        utils.MessageBox.confirm('初始密码安全性较低，请修改密码！')
                            .then(action => {
                                $router.replace({ name: 'Password' });
                            })
                            .catch(e => { });
                    }

                } else {
                    commit('clearAllStorage');
                    route && $router.replace({ name: route });
                    utils.Toast(`${code}：${msg}`);
                }
            } catch (e) {
                commit('isLogin', false);
            }
        },
        // 重置密码
        async Password({ commit, state }, { phoneCode = "", verification = "" }) {
            let { data } = await axios({
                url: CHANGE_CHECKCODE,
                method: "post",
                data: QS.stringify({
                    phone: phoneCode,
                    code: verification
                })
            })
            var userId=data.data
            utils.Toast(data.msg)
            if (data.code == '0') {
                $store.commit('Password', { phoneCode,userId })
                $router.replace({ name: 'Password' });
            }

        }
    }
}
/**
 * @description  初始化state state存在则清空缓存,不存在则从缓存中初始化state
 * @param {Object} state 
 */
function initState(state) {
    state && storage.clear();//清空所有缓存
    state = state || {};
    state.isRaven = false;
    state.menu = attrData('menu', 'Array', []);//投放申请菜单
    state.userPermission = attrData('userPermission');//权限
    state.isLogin = false;
    state.realName = attrData('realName');
    state.users = attrData('users', 'Object', { data: {} });//用户信息
    state.loginInfo = attrData('loginInfo', 'Object', { username: "", password: "", phone: "" });//保存用户账号密码
    return state;
}