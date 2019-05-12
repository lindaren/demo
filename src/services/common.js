
import { DICT, QRY_WXPLAN, LISTUSER, PLACE_RET, ALLUNIT } from '@/utils/Interface';
import axios from '@/utils/request';
import utils from '@/utils/utils';
let { is } = utils;
let citys = [];
//字典查询
export async function getDICT(code) {
    let { data } = await axios({
        url: DICT,
        params: { code }
    });
    return data.data || [];
}
//业务部门
export async function getDepar(params) {
    let { data } = await axios({
        url: ALLUNIT,
        params: {
            page: 1,
            rows: 99,
            ...params
        }
    });
    let { data: { unitInfo = [] } = {} } = data;
    return unitInfo;
}
//扫码套餐
export async function weChartQr(group) {
    let { data } = await axios({
        url: QRY_WXPLAN,
        params:{
            group
        }
    });
    let { data: list = [] } = data;
    return list;
}
//场所信息修改
export async function editPlaceInfo(id) {
    let { data } = await axios({
        url: PLACE_RET,
        params: { id }
    });
    let { data: list = [] } = data;
    return list;
}
//listUser sc=&page=&rows=&userProp=&qry_role=
export async function getListUser(params = {}) {
    let { data } = await axios({
        url: LISTUSER,
        params: {
            ...{
                page: 1,
                rows: 15,
            }, ...params
        }
    })
    return data.list;
}
//获取json
export async function loadCityData() {
    if (citys.length == 0) {
        try {
            let {data=[]} = await axios({
                url: `static/lib/city.json?t=${+new Date()}`
            });
            citys = data;
        } catch (e) {

        }
        return citys;
    } else {
        return citys;
    }
}
//根据name获取对应子集
export function getCity(citys,{ province, city, area }) {
    //省查询市
    if (province && !city) {
        return cityByName(citys, province);
    }
    //省市 查询区
    if (province && city) {
        let i = 0, len = citys.length;
        while (i < len) {
            let { label, value, children } = citys[i];
            if (label == province || value == province) {
                if (is().Array(children)) {
                    return cityByName(children, city);
                }
            }
            i++;
        }
    }
    function cityByName(arr, name) {
        let result = arr.filter(({ label, value, children }) => {
            return label == name || value == name;
        });
        if (result.length > 0) {
            if (!is().Array(result[0].children)) {
                result[0].children = [];
                return [];
            }
            return result[0].children.map(({ label }) => label);
        }
        return [];
    }
}
export function initCity(citys) {
    return [{
        flex: 1,
        values: citys.map(({ label }) => label),
        className: 'slot1',
        defaultIndex: 0,
        textAlign: 'right',
        itemHeight: 32
    }, {
        flex: 1,
        values: citys[0].children.map(({ label }) => label),
        className: 'slot2',
        defaultIndex: 0,
        textAlign: 'center',
        itemHeight: 32
    }, {
        flex: 1,
        values: citys[0].children[0].children.map(({ label }) => label),
        className: 'slot3',
        defaultIndex: 0,
        textAlign: 'left',
        itemHeight: 32
    }]
}
//把name转化id id转化为name
export function transformCity(citys,arr) {
    if (!is().Array(arr)) {
        return [];
    }
    for (let i in arr) {
        if (is().Object(arr[i])) {
            return [];
        }
    }
    let result = new Array(arr.length);
    let num = 0;
    const isTransNumber = function (val) {
        return ((+val) + '') === (val + '');
    }
    const transFn = function (targets, childrens) {
        if (!is().Array(childrens)) {
            return false;
        }
        if (num >= targets.length) {
            return;
        }
        for (let i in childrens) {
            let { label, value, children } = childrens[i];
            let flag = false;
            targets.map((item, index) => {
                if (isTransNumber(item) && item == value) {
                    result[index] = label;
                    flag = true;
                    num++;
                }
                if (!isTransNumber(item) && item == label) {
                    result[index] = value;
                    flag = true;
                    num++;
                }
            });
            if (flag) {
                return transFn(targets, children);
            }
        }
    }
    transFn(arr, citys);
    return result;
}