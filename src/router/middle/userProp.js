import utils from '@/utils/utils'
// 判断是否有权限
export function checkProp(to, from, next) {
    let user = utils.storage.getLocal('users');
    let prop = user.data.userProp;
    let { userProp = 'not' } = to.meta;
    //所有
    if(userProp=='all'){
        return true;
    }
    //业务人员 chome
    if ((userProp != 'not' && userProp == prop )) {
        return true;
    }
    //商家
    if(userProp=='not' && prop!=1){
        return true;
    }
    next({ name: 'error', query: { status: 4011 } });
    return false
}