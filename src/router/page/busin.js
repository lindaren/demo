export default [
    {
        path: '/adminLogin',
        name: 'AdminLogin',
        component: () => import('@/pages/adminLogin'),
        meta: {
            title: '摩歇座',
            userProp: 'all'
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home'),
        meta: {
            keepAlive: true,
            comName: 'home',
            title: '摩歇座'
        }
    }, {
        path: '/userInfo',
        name: 'UserInfo',
        component: () => import('@/pages/UserInfo'),
        meta: {
            title: '用户信息',
            userProp: 'all'
        }
    }, {
        path: '/place',
        name: 'Place',
        component: () => import('@/pages/Place'),
        meta: {
            keepAlive: true,
            comName: 'place',
            title: '场所列表'
        }
    }, {
        path: '/placeInfo',
        name: 'PlaceInfo',
        component: () => import('@/pages/PlaceInfo'),
        meta: {
            title: '场所详情',
            keepAlive: true,
            comName: 'placeInfo',
        }
    }, {
        path: '/terminal',
        name: 'Terminal',
        component: () => import('@/pages/Terminal'),
        meta: {
            comName: 'terminal',
            title: '终端列表'
        }
    }, {
        path:'/partnerTerminal',
        name:'PartnerTerminal',
        component: ()=>import('@/pages/PartnerTerminal/index.vue'),
        meta:{
            keepAlive:true,
            comName:'partnerTerminal',
            title:"终端列表"
        }
    }
    
    ,{
        path: '/order',
        name: 'Order',
        component: () => import('@/pages/order/index.vue'),
        meta: {
            // keepAlive: true,
            comName: 'order',
            title: '订单列表'
        }
    }, {
        path: '/inCome',
        name: 'InCome',
        component: () => import('@/pages/inCome/index.vue'),
        meta: {
            keepAlive: true,
            comName: 'inCome',
            title: '统计'
        }
    }, {
        path: '/newIncome',
        name: 'NewIncome',
        component: () => import('@/pages/newIncome/index.vue'),
        meta: {
            keepAlive: true,
            comName: 'newIncome',
            title: '收益'
        }
    }
    , {
        path: '/inComeShow',
        name:'InComeShow',
        component:() => import('@/pages/inComeShow/index.vue'),
        meta:{
            keepAlive: true,
            comName: 'inComeShow',
            title: '统计详情'
        }
    },
    {
        path: '/inComeInfo',
        name: 'InComeInfo',
        component: () => import('@/pages/InComeInfo/index.vue'),
        meta: {
            title: '收益详情',
            comName: 'inComeInfo',
            keepAlive: true,
        }
    }, {
        path: '/inComeDetail',
        name: 'InComeDetail',
        component: () => import('@/pages/InComeDetail'),
        meta: {
            title: '收益明细',
            comName: 'inComeDetail',
        }
    },
    {
        path: '/inComeSearch',
        name: 'inComeSearch',
        component: () => import('@/pages/inComeSearch'),
        meta: {
            title: '场所搜索'
        }
    }, {
        path: '/userManage',
        name: 'UserManage',
        component: () => import('@/pages/userManage/index.vue'),
        meta: {
            keepAlive: true,
            comName: 'userManage',
            title: '用户管理'
        }
    }, {
        path: '/addPerson',
        name: 'AddPerson',
        component: () => import('@/pages/addPerson/index.vue'),
        meta: {
            title: '编辑用户'
        }
    },
    {
        path: '/bindPlace',
        name: 'BindPlace',
        component: () => import('@/pages/bindPlace/index.vue'),
        meta: {
            title: '授权场所'
        }
    }, {
        path: '/userDetail',
        name: 'UserDetail',
        component: () => import('@/pages/userDetail/index.vue'),
        meta: {
            title: '用户详情'
        }
    }, {
        path: '/code',
        name: 'Code',
        component: () => import('@/pages/code/index.vue'),
        meta: {
            title: '二维码',
            userProp: 'all'
        }
    },
    {
        path: '/password',
        name: 'Password',
        component: () => import('@/pages/password/index.vue'),
        meta: {
            title: '修改密码',
            userProp: 'all'
        }
    },
]