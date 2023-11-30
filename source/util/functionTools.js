export  function 柯里化(原始函数) {
    return function 柯里化版本函数(...输入参数) {
        //原始函数.length
        if (输入参数.length >= 原始函数.length) {
            return 原始函数.apply(this, 输入参数);
        } else {
            return function(...args2) {
                return 柯里化版本函数.apply(this, 输入参数.concat(args2));
            }
        }
    };
}
export function 等待参数达到长度后执行(原始函数, 预定长度) {
    let 柯里化版本函数 = 柯里化(原始函数);
    return function(...输入参数) {
        if (输入参数.length >= 预定长度) {
            return 柯里化版本函数(...输入参数);
        } else {
            return function(...args2) {
                return 柯里化版本函数(...输入参数, ...args2);
            }
        }
    };
}