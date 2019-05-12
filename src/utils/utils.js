import Vue from 'vue'
import QS from "querystring";
import { Toast, Indicator, MessageBox ,InfiniteScroll} from 'mint-ui';
import storage from '@/utils/storage.js';
import $router from '@/router';
/**
 * @description 格式化
 * @param {String} fmt yyyy-MM-dd hh:mm:ss    
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/**
 * @description 解析url字符串
 * @param {String} url 
 * @return {Object} 
 */
function URLObject(url) {
    url = url || window.location.search;
    var theRequest = {};
    var strs = "";
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
/**
 * @description toast消息
 * @param {Object||String} args 
 */
function $Toast(args) {
    let op = {};
    if (typeof args === 'string') {
        op.message = args;
    }
    if (typeof args === 'object') {
        op = args;
    }
    Toast(Object.assign({
        message: "",
        position: 'bottom',
        duration: 2000
    }, op));
}
/**跳转登录页面 */
function ToLogin() {
    const isWeixin = () => {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    return $router.push({ name: 'Transition' });
}
/**
 * @description 是否是微信
 * @return {Boolean} 
 */
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}
/**
 * @description 去抖
 * @param {Function} fn 
 * @param {Number} delay
 * @return {Function} 
 */
function debounce(fn, delay) {
    let t = null;
    return function (...args) {
        const func = () => {
            fn.apply(this, args)
        }
        clearTimeout(t)
        t = setTimeout(func, delay)
    }
}
/**
 * @description 去抖
 * 
 * @param {Function} fn 
 * @param {Number} delay 
 * @param {String} msg  
 * @return {Function} 
 */
function throttle(fn, delay) {
    let start = 0;
    return function (...args) {
        let curr = +new Date();
        if (curr >= (start + delay)) {
            fn.apply(this, args)
            start = curr;
            return;
        }
    }
}
/**
 * @description 初始化属性值
 * @param {String} name 属性名 
 * @param {String} type 类型
 * @param {*} default 默认值 
 * */
function attrData(name = '', type = 'String', defaults = '') {
    let value = storage.getLocal(name);
    try {
        value = is()[type](value) ? value : defaults;
    } catch (e) {
        value = defaults;
    }
    return value;
}
/**
 * @description 判断类型
 * @returns {Function}
 */
function is() {
    let is = {
        types: ["Array", "Function", "Boolean", "Date", "Number", "Object", "RegExp", "String", "Window", "HTMLDocument"]
    };
    for (let i = 0, c; c = is.types[i++];) {
        is[c] = (function (type) {
            return function (obj) {
                return Object.prototype.toString.call(obj) == "[object " + type + "]";
            }
        })(c);
    }
    return is;
}
/**
 * @description 判断用户是否有缓存users
 * @param {*} users 
 * @returns {Boolean}
 */
function isUsers(users) {
    users = users || storage.getLocal('users');
    return is().Object(users) && users.data && users.data.username ? true : false;
}
/**
 * @description 对象深拷贝
 * @param {Object} obj 
 * @returns {Object}
 */
function OParse(obj) {
    try {
        return JSON.parse(JSON.stringify(obj))
    } catch (e) {

    }
    return {};
}
Vue.prototype.$URLObject = URLObject;
Vue.prototype.$QS = QS;
Vue.prototype.$Indicator = Indicator;
Vue.prototype.$Toast = $Toast;
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$OParse = OParse;
export default {
    URLObject,
    Toast: $Toast,
    Indicator,
    storage,
    ToLogin,
    MessageBox,
    InfiniteScroll,
    isWeixin,
    debounce,
    throttle,
    attrData,
    is,
    isUsers,
}