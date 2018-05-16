<template>
    <div class="footer" v-if="isShow">  
            <div class="footer_panel" @click="handle" v-show="isShowContent" >
                <p class="footer_panel_info">
                    <span class="footer_panel_info_tem">月供</span>
                    <span class="footer_panel_info_num">{{monthlySupply | addUS}}</span>
                </p>
            </div>
            <div class="footer_submit" v-show="isShowContent" @click="submit">
                <a class="footer_submit_href" href="javascript:;">分期购买</a>
            </div>

        <slot v-show="!isShowContent"></slot>
    </div>
</template>

<script>
import {bus, busType} from '@/bus';

export default {
    name: 'detailsFooter',
    props: {
        isShowContent: {
            type: Boolean,
            default: function () {
                return true
            }
        },
        monthlySupply: [String, Number],
        isShow: [Boolean]
    },
    methods: {
        handle() {
            // 开启比例popup
            // bus.$emit(busType.OPEN_POPUP_RATIO);
        },
        submit() {
            this.$emit('submit');
        }
    },
    filters: {
        addUS: function (value) {
            return `￥${value}`;
        }
    }
}
</script>

<style lang="less" src="./index.less" scoped>


</style>