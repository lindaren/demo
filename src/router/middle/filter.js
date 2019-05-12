import $store from '@/model/index'
import utils from '@/utils/utils'
export function filter(to, from, next) {
    let filter = ['Login', 'AccountLogin', 'AdminLogin'];
    if(to.name=='error'){
        next();
        return false;
    }
    if(to.name=='Password'){
        next();
        return false;
    }
    
    if (filter.indexOf(to.name) !== -1) {
        //判断是否有登录信息 
        let loginInfo = utils.storage.getLocal('loginInfo');
        // 已登录 继续执行
        if (utils.is().Object(loginInfo)) {
            let { username, phone, password } = loginInfo;
            if (password && (username || phone)) {
                $store.dispatch('doLogin', { route: to.name, phone, password, username ,automatic:true});
                next(false);
                return;
            }
        }
        next()
        return false;
    }
    return true
}