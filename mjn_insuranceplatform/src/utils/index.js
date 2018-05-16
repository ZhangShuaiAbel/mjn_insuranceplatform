
import jscalc from 'jscalc';
import store from '@/vuex';
import * as mutationTypes from "@/vuex/mutations/types";
import * as actionTypes from "@/vuex/actions/types";

const utils = {};

// 计算 + - * /
const calc = function (type,paramOne,paramTwo) {
    switch( type )
    {
        case '+':
            return jscalc.Add(parseFloat(paramOne),parseFloat(paramTwo));
        case '-':
            return jscalc.Subtr(parseFloat(paramOne),parseFloat(paramTwo));
        case '*':
            return jscalc.Mul(parseFloat(paramOne),parseFloat(paramTwo));
        case '/':
            return jscalc.Div(parseFloat(paramOne),parseFloat(paramTwo));
    }
}

// 挂载全局
utils.install = function(vue) {
    vue.prototype.$calc = function(type, paramOne, paramTwo) {
        return calc(type, paramOne, paramTwo);
    };
}

export default utils;