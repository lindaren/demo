export const basic = {
    // 复杂字段
    // lastCoperator: { id: cooperator.id, username: cooperator.username } //合伙
    // allCity: [province + '', city + '', county + '']//归属区域
    //基础字段
    name: 'name',//场所名称
    oname: 'name',//场所名称
    type: 'type',//场所类型
    planId: 'planId',//扫码套餐
    level: 'level',//场所档位
    province: 'province',
    tmType: 'tmType',//产品类型
    city: 'city',
    county: 'county',
    address: 'address',//详细地址
    longitude: 'longitude',//经度
    latitude: 'latitude',//纬度
    maintainId: 'maintainId',//维护人员
    // unitid: 'unitid',//业务部门
    // salesId: 'salesId',//业务人员
    operator: 'operator',//经办人员
    rcperson: 'rcperson',//收货人姓名
    rcphone: 'rcphone',//收货人电话
    note: 'note',//备注信息
   
    
}

export const contract = {
    //复杂字段
    // beginDate : info.beginDate.split(" ")[0];//合同开始日期
    // endDate : info.endDate.split(" ")[0];//合同结束日期
    //基础字段
    lastMerchant: 'merchant',//商家
    signCount: 'signCount',//投放数量
    oldCount: 'signCount',//投放数量
    billType: 'billType',//结算方式
    storeRate: 'storeRate',//商家分成
    rate: 'rate',//我司分成
    rent: 'nextRent',//租金
    reward: 'reward',//押金
    agentRate: 'agentRate',//代理费
    businessNum: 'businessNum',//营业执照编码
    receiver: 'receiver',//收款人
    bank: 'bank',//开户行
    subBank: "subBank",//支行
    account: 'account',//账号

    ctname: 'ctname',//合同方名称
    images: 'contList',//合同附件
    settleName: 'settleName',//结算联系人
    telephone: 'telephone'//手机号码

}

export let form = () => {
    return {
        id: "",
        name: "",//场所名称
        oname: "",//场所名称
        type: "",//场所类型
        plan: "",//扫码套餐
        planId: "",//扫码套餐Id
        tmType: "",//产品类型
        level: "",//场所档次
        allCity: [],//3级数组                            
        province: "",//归属省份
        city: "",//归属地市
        county: "",//归属区县
        address: "",//详细地址
        longitude: 0,//经度
        latitude: 0,//纬度
        maintainId: "",//维护人员
        // unitid: "",//业务部门
        // salesId: "",//业务人员
        salesman: "",//业务人员名字
        operator: "",//经办人员
        operatorName: "",//经办人员名字
        lastCoperator: null,//合伙/代理人
        rcperson: "",//收货人姓名
        rcphone: "",//收货人电话
        note: "",//备注
        showSwitch: false,//是否显示物流单

        lastMerchant: [],//商家
        signCount: "1",//投放数量
        oldCount: "1",//初始

        needLog: 1, //生成物流单
        billType: "2",//结算方式
        storeRate: 40,//商家分成
        rate: 60,//我司分成
        agentRate: null,//代理费
        reward: null,//场地押金
        rent: null,//场地租金

        receiver: "", //收款人
        bank: "", //开户行,
        bankId:"",//开户行Id
        subBank:"",//支行
        account: "", //账号
        businessNum:"",//营业执照编码
        ctname: "", //合同方名称
        beginDate: "", //合同开始日期
        endDate: "", //合同结束日期
        images: [],//上传的图片,
        settleName: '',//结算联系人
        telephone: '',//手机号码
        company: ''//归属公司
    }
}
const required = (message) => {
    return { required: true, message }
}
const integers = (message) => {
    return {
        type: 'integer', min: 0, message, transform(value) {
            return +value
        }
    }
}
const numbers = (message, { max, min } = {}) => {
    let result = {
        type: 'number', message, transform(value) {
            return +value
        }
    }
    if (typeof max === 'number') {
        result.max = max;
    }
    if (typeof min === 'number') {
        result.min = min;
    }
    return result;
}
const phones = { type: 'string', len: 11, message: '电话格式为11位数字' };
export function getRules(billType, describe) {
    let basicRules = {},
        contractRules = {};
    if (describe != 'contract') {
        basicRules = {
            name: required('请填写场所名称'),
            type: required('请选择场所类型'),
            prop:required('请选择场所性质'),
            tmType: required('请选择产品类型'),
            planId: required('请选择扫码套餐'),
            allCity: required('请选择归属区域'),
            address: required('请选择详细地址'),
            longitude: required('请填写经纬度'),
            latitude: required('请填写经纬度'),
            // maintainId: required('请选择维护人员'),
            operator: required('请选择经办人员'),
            rcperson: required('请填写收货人'),
            rcphone: [required('请填写收货人电话'), phones, numbers('收货人电话格式为11为数字')],
            company: required('请选择归属公司')
        }
    }
    if (describe != 'basic') {
        contractRules = {
            signCount: [required('请填写投放数量'), integers('投放数量请输入整数')],
            billType: required('请选择结算方式'),
            bank:required('请输入开户行'),
            subBank:required('请输入支行'),
            receiver:required('请输入收款人'),
            account:required('请输入账号'),
            businessNum: required('请填写营业执照编号'),
            settleName: required('请填写结算联系人'),
            telephone: [required('请填写联系人电话'), phones, numbers('联系人电话格式为11为数字')],
            
            beginDate: required('请选择合同开始日期'),
            endDate: required('请选择合同结束日期'),

        }
        if (billType == 1) {
            contractRules.rent = [required('请填场地租金'), numbers('场地租金请输入数字')];
        }
        if (billType == 2 || billType == 5) {
            contractRules.storeRate = [required('请填写商家分成'), numbers('商家分成范围0~100%', { min: 0, max: 100 }),];
            contractRules.rate = [required('请填写我司分成'), numbers('我司分成分成范围0~100%', { min: 0, max: 100 })];
        }
        if (billType == 3) {
            contractRules.rent = [required('请填设备租金'), numbers('设备租金请输入数字')];
        }
    }
    return {
        ...basicRules, ...contractRules
    };
}