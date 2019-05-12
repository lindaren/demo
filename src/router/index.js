import Vue from 'vue'
import VueRouter from 'vue-router'
import BusinArr from './page/busin';//商家页面
import ComArr from './page/com';//业务模块
import { beforeEach, afterEach } from '@/router/middle'
import AccountLogin from '@/pages/accountLogin';
//入口文件
const Entrys = {
    path: '/',
    redirect: '/accountLogin',
    meta: {
        userProp: 'all'
    }
}
//入口文件
const trEntrys = {
    path: '/transition',
    redirect: '/accountLogin',
    meta: {
        userProp: 'all'
    }
}
// 账号登录
const AccLoginRoute = {
    path: '/accountLogin',
    name: 'AccountLogin',
    component: AccountLogin,
    meta: {
        title: '摩歇座',
        userProp: 'all'
    }
}
//错误
const ErrorRoute = {
    path: '/error',
    name: 'error',
    component: () => import('@/pages/error'),
    meta: {
        title: '出错了',
        userProp: 'all'
    }
}
//匹配其他
const Others = {
    path: '*',
    redirect: 'error'
}
const router = new VueRouter({
    routes: [
        AccLoginRoute,
        Entrys,
        trEntrys,
        ...BusinArr,
        ...ComArr,
        ErrorRoute,
        Others
    ]
});
router.beforeEach(beforeEach)
router.afterEach(afterEach);
export default router;