import Vue from 'vue'
/**
 * 收益过滤
 * @param {*} value 
 */
function moneySplit(value) {
    value = +value;
    if (isNaN(value)) {
        return '0'
    }
    return value.toString().replace(/\d(?=(?:\d{3})+\b)/g, '$&,');
}
/**
 *秒转化成小时分
 */
function secondTrans(time) {
    var hh = parseInt(time / 3600);
    if (hh < 10) hh = "0" + hh;
    var mm = parseInt((time - hh * 3600) / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = parseInt((time - hh * 3600) % 60);
    if (ss < 10) ss = "0" + ss;
    if (time > 0) {
        return hh + ":" + mm + ":" + ss;;
    } else {
        return '00:00:00';
    }
}
/**
 *  保留两位
 */
function fixedTwo(value, num = 2) {
    value = +value;
    if (isNaN(value)) return '0.00'
    if (typeof value === 'number') {
        return value.toFixed(num);
    }
    if (typeof value === 'string') {
        return (+value).toFixed(num);
    }
}
 // 判断间隔日期间隔
function DateDifference(Date1, Date2) {
    //Date1和Date2是2017-07-10格式  
    var sDate, newDate1, newDate2, Days,
        aDate = Date1.split("-");
    newDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    //转换为07-10-2017格式  
    aDate = Date2.split("-");
    newDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    Days = parseInt(Math.abs(newDate1 - newDate2) / 1000 / 60 / 60 / 24);
    //把差的毫秒数转换为天数  
    return Days;
}
Vue.filter('moneySplit', moneySplit)
Vue.filter('secondTrans', secondTrans)
Vue.filter('fixedTwo', fixedTwo)
export default {
    moneySplit,
    secondTrans,
    fixedTwo,
    DateDifference
}