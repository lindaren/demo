import utils from '@/utils/utils'
// 判断是否登录
export function isLogin(to, from, next) {
    let user = utils.storage.getLocal('users');
    // 已登录 继续执行
    if (utils.isUsers()) {
        return true
    }
    next({ name: 'AccountLogin' });
    return false
}