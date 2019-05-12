export default [{
    path: '/comHome',
    name: 'ComHome',
    component: () => import('@/pages/aCompages/home'),
    meta: {
        keepAlive: true,
        comName: 'comHome',
        userProp: 1,
        title: '摩歇座'
    }
}, {
    path: '/putApproval',
    name: 'PutApproval',
    component: () => import('@/pages/aCompages/putApproval'),
    meta: {
        keepAlive: true,
        comName: 'putApproval',
        userProp: 1,
        title: '投放申请'
    }
}, {
    path: '/putApprovalDetail',
    name: 'PutApprovalDetail',
    component: () => import('@/pages/aCompages/putApprovalDetail'),
    meta: {
        title: '列表详情',
        userProp: 1,
    }
}, {
    path: '/putApprovalAdd',
    name: 'PutApprovalAdd',
    component: () => import('@/pages/aCompages/putApprovalAdd'),
    meta: {
        title: '投放申请',
        userProp: 1,
    }
}, {
    path: '/placeManage',
    name: 'PlaceManage',
    component: () => import('@/pages/aCompages/placeManage'),
    meta: {
        keepAlive: true,
        comName: 'placeManage',
        userProp: 1,
        title: '场所管理'
    }
}, {
    path: '/placeManageDetail',
    name: 'PlaceManageDetail',
    component: () => import('@/pages/aCompages/placeManageDetail'),
    meta: {
        title: '列表详情',
        userProp: 1,
    }
}, {
    path: '/placeManageAdd',
    name: 'PlaceManageAdd',
    component: () => import('@/pages/aCompages/placeManageAdd'),
    meta: {
        title: '场所管理',
        userProp: 1,
    }
}, {
    path: '/terminalManage',
    name: 'TerminalManage',
    component: () => import('@/pages/aCompages/terminal'),
    meta: {
        keepAlive: true,
        comName: 'terminalManage',
        userProp: 1,
        title: '终端管理'
    }
}, {
    path: '/terminalManageDetail',
    name: 'TerminalManageDetail',
    component: () => import('@/pages/aCompages/terminalDetail'),
    meta: {
        title: '列表详情',
        userProp: 1,
    }
}, {
    path: '/terminalManageAdd',
    name: 'TerminalManageAdd',
    component: () => import('@/pages/aCompages/terminalAdd'),
    meta: {
        title: '终端管理',
        userProp: 1,
    }
}, {
    path: '/terminalManageDelete',
    name: 'TerminalManageDelete',
    component: () => import('@/pages/aCompages/terminalDelete'),
    meta: {
        title: '终端撤机',
        userProp: 1,
    }
}, {
    path: '/terminalChange',
    name: 'TerminalChange',
    component: () => import('@/pages/aCompages/terminalChange'),
    meta: {
        title: '终端撤机',
        userProp: 1,
    }
}, {
    path: '/comprehensive',
    name: 'Comprehensive',
    component: () => import('@/pages/aCompages/comprehensive'),
    meta: {
        keepAlive: true,
        comName: 'comprehensive',
        title: '综合查询',
        userProp: 1,
    }
}, {
    path: '/onLineSearch',
    name: 'OnLineSearch',
    component: () => import('@/pages/aCompages/OnLineSearch'),
    meta: {
        keepAlive: true,
        comName: 'onLineSearch',
        title: '终端在线查询',
        userProp: 1,
    }
}, {
    path: '/onLineSearchInfo',
    name: 'OnLineSearchInfo',
    component: () => import('@/pages/aCompages/OnLineSearchInfo'),
    meta: {
        title: '终端详情',
        userProp: 1,
    }
}, {
    path: '/changeRecord',
    name: 'ChangeRecord',
    component: () => import('@/pages/aCompages/changeRecord'),
    meta: {
        keepAlive: true,
        comName: 'changeRecord',
        title: '终端更换记录',
        userProp: 1,
    }
}, {
    path: '/changeRecordInfo',
    name: 'ChangeRecordInfo',
    component: () => import('@/pages/aCompages/changeRecordInfo'),
    meta: {
        title: '终端更换记录详情',
        userProp: 1,
    }
}, {
    path: '/coinRecord',
    name: 'CoinRecord',
    component: () => import('@/pages/aCompages/coinRecord'),
    meta: {
        keepAlive: true,
        comName: 'coinRecord',
        title: '投币记录查询',
        userProp: 1,
    }
}, {
    path: '/coinRecordInfo',
    name: 'CoinRecordInfo',
    component: () => import('@/pages/aCompages/coinRecordInfo'),
    meta: {
        title: '投币记录详情',
        userProp: 1,
    }
}, {
    path: '/refundRecord',
    name: 'RefundRecord',
    component: () => import('@/pages/aCompages/refundRecord'),
    meta: {
        keepAlive: true,
        comName: 'refundRecord',
        title: '退款记录查询',
        userProp: 1,
    }
}, {
    path: '/refundRecordInfo',
    name: 'RefundRecordInfo',
    component: () => import('@/pages/aCompages/refundRecordInfo'),
    meta: {
        title: '退款记录详情',
        userProp: 1,
    }
}, {
    path: '/remoteRecord',
    name: 'RemoteRecord',
    component: () => import('@/pages/aCompages/remoteRecord'),
    meta: {
        keepAlive: true,
        comName: 'remoteRecord',
        title: '远程操作查询',
        userProp: 1,
    }
}, {
    path: '/workingRecord',
    name: 'WorkingRecord',
    component: () => import('@/pages/aCompages/workingRecord'),
    meta: {
        keepAlive: true,
        comName: 'workingRecord',
        title: '终端运行记录',
        userProp: 1,
    }
}, {
    path: '/workingRecordInfo',
    name: 'WorkingRecordInfo',
    component: () => import('@/pages/aCompages/workingRecordInfo'),
    meta: {
        title: '终端运行记录详情',
        userProp: 1,
    }
}, {
    path: '/payOrderSearch',
    name: 'PayOrderSearch',
    component: () => import('@/pages/aCompages/payOrderSearch'),
    meta: {
        keepAlive: true,
        comName: 'payOrderSearch',
        title: '支付订单查询',
        userProp: 1,
    }
}, {
    path: '/payOrderSearchInfo',
    name: 'PayOrderSearchInfo',
    component: () => import('@/pages/aCompages/payOrderSearchInfo'),
    meta: {
        title: '支付订单详情',
        userProp: 1,
    }
},
]