import Vue from 'vue'
import axios from 'axios'
import utils from '@/utils/utils'
import $store from '@/model/index.js'
import $router from '@/router/index.js'
axios.defaults.timeout = 25 * 1000;
// axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"
axios.defaults.headers['appId']="BB59573E2BFD42499BFA8820E94AC1D7";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    config.headers['authorization'] = utils.storage.getLocal("authorization");
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

//响应拦截器
axios.interceptors.response.use(function (res) {
    if (res.data.code == -99) {
        utils.Toast('登录失效，请重新登录！');
        utils.Indicator.close();
        removeLoading();
        $store.dispatch('loginOut');
        throw new Error(res.data.msg);
    }
    if (res.data.code == 1) {
        utils.Toast(res.data.msg);
        utils.Indicator.close();
        removeLoading();
        throw new Error(res.data.msg);
    }
    return res;

}, function (error) {
    removeLoading();
   
    if (!error.response) {
        utils.Toast('服务无响应，请稍后再试');
        utils.Indicator.close();
        onError(error)
        return Promise.reject(error);
    }
    let { status, data, statusText } = error.response;
    if (status == 404) {
        utils.Toast('404:未找到资源！');
        utils.Indicator.close();
        $router.replace({ name: "error", query: { status: 404 } });
    } else if (status == 413) {
        utils.Toast('413:Request Entity Too Large！');
        utils.Indicator.close();
    } else if (status == 504) {
        utils.Toast('504:服务器超时,请稍后！');
        utils.Indicator.close();
    }
    onError(error)
    return Promise.reject(error);
});

function onError(error) {
    const Monitor = Vue.prototype.$monitor
    Monitor.pushException({
        route: `url ${error.config.url}`,
        details: error.message,
        errorDetails: error.stack
    })
}
function removeLoading() {
    let dom = document.querySelectorAll('.fy-loading-box');
    for (let i = 0; i < dom.length; i++) {
        dom[i].parentNode.removeChild(dom[i])
    }
}
Vue.prototype.$http = axios;
export default axios;