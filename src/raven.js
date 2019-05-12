
import Vue from 'vue';
import $store from '@/model/index'
import Monitor from 'monitors-js/lib/monitor'
import vuePlugin from 'monitors-js/lib/vuePlugin'
import QS from 'querystring'
const monitor = new Monitor({
    itemID: '1',
    url: '/fzweb/platform/sys/error/log/addDo',
    project: 'FzmbBusiness',
    match: ['mis.fzminben.com', '192.168.1.31'],//需要上报的域名
    exclude: ['WeixinJSBridge', 'x5onSkinSwitch'],//过滤的错误信息 根据details
})
Vue.prototype.$monitor = monitor;
monitor
    .addPlugin(vuePlugin)
    .install()
    .on('captureBefore', (data) => {
        data.errorInfo = JSON.stringify( data.actions );
    })
//初始化
export const install = () => {
    //设置用户
    try {
        setContext($store.state.transition.users.data)
    } catch (e) {

    }
}

//设置上下文
export const setContext = ({ username, userProp, wxName, loginname, email }) => {
    //设置上下文
    monitor.setConfig({
        wxName: `用户名：${username},userProp：${userProp},wxName：${wxName},loginname:${loginname}`,
        user: JSON.stringify({ username, wxName, userProp, loginname })
    });
}
export default monitor;