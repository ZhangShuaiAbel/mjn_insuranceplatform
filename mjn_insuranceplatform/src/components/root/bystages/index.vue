<template>
    <div class="by_stages">
        <div class="popup_radio" v-if="dataSource != false">
            <!-- 比例title img -->
            <div class="radio_top">
              <iframe v-if="isShowiframe" src="javascript:;" width="0" height="0" ref="stagesiframe"></iframe>
              <div v-if="titleImage !== ''" class="radio_top_image" >
                <div 
                  class="image" 
                  :style="{ background: 'url(' + titleImagePath + ')' + 'center center no-repeat' }"
                ></div>
              </div>
              <div class="radio_top_info">
                <P class="radio_top_title">{{title}}</P>
                <P class="radio_top_price">{{ price | addUnit}}</P>
              </div>
            </div>
            
            <div class="radio_content">
              <!-- 首付比例 -->
              <div class="radio_content_ratio">
                <P class="ratio_title">首付比例</P>
                <ul class="ratio_content">
                  <li 
                    v-for="(item,index) in dataSource"
                    :key="index"
                    :class="paymentIndex === index ? 'ratio_item ratio_item_active' : 'ratio_item'"
                    @click="handlePayment(index)"
                  >{{item.downPayment | percentage}}</li>
                </ul>
              </div>
              <!-- 分期月数 -->
              <div class="radio_content_months">
                <p class="months_title">分期月数</p>
                <ul class="months_content">
                  <li 
                    :class="stagesIndex === index ? 'months_item months_item_active' : 'months_item'"
                    v-for="(item, index) in monthsList"
                    :key="index"
                    @click="handleStages(index)"
                  >{{item.periods | byStages}}</li>
                </ul>
              </div>
            </div>

            <!-- 首付，月供金额 popup 底部 -->
            <div class="radio_bottom_1">
              <div class="popup_value">
                <p class="popup_value_payment">
                  <span>首付</span>
                  <span class="is_active">{{firstPayment | addUS}}</span>
                </p>
                <p class="segmenting_line"></p>
                <p class="popup_value_radio">
                  <span>月供</span>
                  <span class="is_active">{{monthlySupply | addUS}}</span>
                </p>
              </div>
              <div class="popup_confirm" @click="send">
                  <a class="href">确认</a>
              </div>
            </div>
            <ms-hint :isShow="isShowHint" :isText="isText"></ms-hint>
        </div>
    </div>
</template>

<script>
/* 
*   name  popup 比例根组件
*
*   @params title 标题
*   @params price 价格
*   @params dataSource 数据源
*   @params titleImagePath 头部图片地址
*   
*/
import { calc } from '@/utils';
import { bus, busType } from "@/bus";
import Hint from '@/components/common/hint';

export default {
    name: 'ratioRoot',
    data() {
        return {
            paymentIndex: 0, // 首付索引
            stagesIndex: 0,  // 月供索引
            firstPayment: '', // 首付金额
            monthlySupply: '', // 月供金额
            isShowiframe: false, // 是否显示iframe
            fenqiPersent: '', // 分期利率
            fenqiNum: '', // 分期月数
            productNum: 1,
            shoufuPersent: 0, // 首付百分比
            fenqiId: '', // 分期ID
            isShowHint: true,
            isText: ''
        }
    },
    props: {
        isHref: [String], // 跳转native协议
        title: [String], // 标题
        price: [Number], // 价格
        titleImagePath: [String], // 图片地址
        dataSource: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    computed: {
        // 月份列表
        monthsList: function() {
            let monthList = this.dataSource[this.paymentIndex].financeProducts;
            return monthList;
        }
    },
    components: {
        msHint: Hint
    },
    mounted() {
        // 初始化调取分期计算比例
        this._calcRatio();
    },
    methods: {
        // 触发首付比例
        handlePayment(index) {
            this.paymentIndex = index;
            // 调取分期计算比例
            this._calcRatio();
        },
        // 触发分期比例
        handleStages(index) {
            this.stagesIndex = index;
            // 调取分期计算比例
            this._calcRatio();
        },
        // 计算比例
        _calcRatio() {
            // 首付金额
            let firstPayment = calc('*', this.price ,this.dataSource[this.paymentIndex].downPayment).toFixed(2);
            // 月供本金
            let ben = this.price - firstPayment;
            // 月供利率
            let lv = this.dataSource[this.paymentIndex].financeProducts[this.stagesIndex].interest;
            // 月供期限
            let qi = this.dataSource[this.paymentIndex].financeProducts[this.stagesIndex].periods;
            /*
                月供金额公式:
                每月还款额 = 总贷款额 X 月利率 X ( 1+月利率 ) ^ 还款期数 / ( ( 1+月利率 ) ^ 还款期数 -1 )
                var moon = (ben * lv * Math.pow( (1+lv),qi) ) / ( Math.pow( (1+lv),qi ) -1);
            */
            // 设置首付金额
            this.firstPayment = firstPayment;
            // 设置月供金额
            let moon = calc('/',(calc('*',calc('*',ben,lv), Math.pow((calc('+',1,lv)),qi))),(calc('-',Math.pow((1+lv),qi),1))).toFixed(2);
            // 设置月供
            this.monthlySupply = moon;

            /* 设置同步数据 */
            // 设置首付比例
            this.shoufuPersent = this.dataSource[this.paymentIndex].downPayment;
            // 设置分期利率
            this.fenqiPersent = this.dataSource[this.paymentIndex].financeProducts[this.stagesIndex].interest;
            // 设置分期ID
            this.fenqiId = this.dataSource[this.paymentIndex].financeProducts[this.stagesIndex].id;
            // 设置分期月数
            this.fenqiNum = this.dataSource[this.paymentIndex].financeProducts[this.stagesIndex].periods;
            
            // 设置跳转协议数据
            let result = {
                fenqiNum: this.fenqiNum,
                fenqiPersent: this.fenqiPersent,
                shoufuPersent: this.shoufuPersent,
                fenqiId: this.fenqiId,
                img: this.titleImagePath ,
                jdPrice: this.price,
                title: this.title
            };

            // 全局通知详情月供及native通信协议
            bus.$emit('monthlySupply', moon, result);

        },
        // 触发确认按钮
        confirm() {
            // 关闭碳层
            // bus.$emit(busType.CLOSE_POPUP_RATIO);
        },
        send() {
            // 如果没有userId 没有登录 跳转客户端
            if ( this.$route.query.userId == undefined || this.$route.query.userId === 'undefined') {
                this.isShowHint = !this.isShowHint;
                this.isText = '请前往用户中心登录！';
                return;
            }

            this.isShowiframe = true;
            this.$nextTick(() => {
                // 失败触发native
                this.$refs.stagesiframe.src = this.isHref ? this.isHref : 'javascript:;';
            });
        }
    },
    watch: {},
    filters: {
        percentage: function (value) { // 百分比
        let result = `${parseInt(parseFloat(value) * 100)}%`;
            return result;
        },
        byStages: function (value) { // 分期
            return `${value}期`;
        },
        addUS: function (value) {
            return `￥${value}`;
        },
        addUnit: function (value) { // 元
            return `${value}元`; 
        }
    }
}
</script>

<style lang="less" src="./index.less">

</style>