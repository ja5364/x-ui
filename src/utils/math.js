export default {
    /* @ 浮点数小数点超过7位还是会出现误差，请不要那么无聊!! */
    /* 两个数相加, 解决浮点数出现误差的问题 */
    addition(arg1, arg2) {
        let r1, r2, m;
        try {
            r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (this.multiplication(arg1, m) + this.multiplication(arg2, m)) / m;
    },
    /* 两个数相减, 解决浮点数出现误差的问题 */
    subtract(arg1, arg2) {
        return this.addition(arg1, -arg2);
    },
    /* 两个数相乘, 解决浮点数出现误差的问题 */
    multiplication(arg1, arg2) {
        let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split('.')[1].length;
        } catch (e) {
        }
        try {
            m += s2.split('.')[1].length;
        } catch (e) {
        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    },
    /* 两个数相除, 解决浮点数出现误差的问题 */
    division(arg1, arg2) {
        let t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split('.')[1].length;
        } catch (e) {
        }
        try {
            t2 = arg2.toString().split('.')[1].length;
        } catch (e) {
        }
        r1 = Number(arg1.toString().replace('.', ''));
        r2 = Number(arg2.toString().replace('.', ''));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
}
