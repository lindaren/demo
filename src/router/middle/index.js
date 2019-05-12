import $store from '@/model/index'
import utils from '@/utils/utils'
import { filter } from './filter';
import { isLogin } from './isLogin';
import { checkProp } from './userProp';
const fns = [filter, isLogin, checkProp];
export const beforeEach = (to, from, next) => {
    let isNext = null;
    let i = 0;
    while (i < fns.length) {
        isNext = fns[i](to, from, next);
        if (!isNext) break;
        i++;
    }
    if (isNext) { next() }
}

export const afterEach = (to, from, next) => {
}