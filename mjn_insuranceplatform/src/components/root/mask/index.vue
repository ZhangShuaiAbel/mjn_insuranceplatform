<template>
    <div class="mask" v-show="isShow" @click.stop="handleView">
        <slot></slot>
    </div>
</template>

<script>
import {bus, busType} from '@/bus';
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleView() {
            // 关闭比例popup
            bus.$emit(busType.CLOSE_POPUP_RATIO);
            // 关闭服务popup
            bus.$emit(busType.CLOSE_POPUP_SERVICE);
            // 关闭三级联动popup
            bus.$emit(busType.CLOSE_CITY_POPUP);
            // 关闭万能卡详情比例弹层
            bus.$emit(busType.ClOSE_WANNENG_POPUP);
            //关闭使用规则弹层
            bus.$emit(busType.ClOSE_REGULATION);

            
        }
    }
}

</script>

<style lang="less" src="./index.less" scoped></style>