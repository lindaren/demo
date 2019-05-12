export const basic = {
    id: "tmNo",
    placeName: "placeName",//场所名称
    placeId: "placeId",//场所ID
    oplaceId: "placeId",//原场所ID
    name: "name",//附加信息
    comAddr: "comAddr",//终端编号
    ocomAddr: "comAddr",//原终端编号
    testCount: null,//测试次数
    prop: "prop",//计费方式
    planId: "planId",//扫码套餐                            
    type: "type",//机型
    model: "model",//型号
    simType: "simType",//网络服务商
    network: "network",//接入方式
    dfNo: "dfNo",//资产编码
    note: "note",//备注信息
}


export let form = () => {
    return {
        placeVisible:false,
        id: "",
        placeName: "",//场所名称
        placeId: "",//场所ID
        oplaceId: "",//原场所ID
        name: "",//附加信息
        comAddr: "",//终端编号
        ocomAddr: "",//原终端编号
        testCount: null,//测试次数
        prop: "",//计费方式
        planId: "",//扫码套餐                            
        type: "",//机型
        model: "",//型号
        simType: "",//网络服务商
        network: "",//接入方式
        dfNo: "",//资产编码
        note: "",//备注信息
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
const dfNo = {type:'string',len:14,message:'资产编号的长度为14位'};
export function getRules() {
    let termRules = {
        placeId: required('请选择场所名称'),
        comAddr: required('请选择终端编号'),
        prop: required('请选择计费方式'),
        planId: required('请选择扫码套餐'),
        type: required('请选择机型'),
        dfNo: dfNo,
    }
    return termRules;
}