<template>
<!-- :style="{ background: 'url(' + item.path + ')' + 'center center' }" -->
    <a 
        :href="url && !authStatus || iconCode === 'lianxiren' ? url : 'javascript:;'" 
        class="panel_item" 
        @click="jumpUrl"
    >
        <span class="panel_item_left">
            <!-- left => icon -->
            <span 
                class="panel_item_left_icon"
                :class="'panel_item_left_icon_'+ iconCode"
            ></span>
            <span class="panel_item_left_text" v-text="leftText"></span>
        </span>
        <span class="panel_item_right">
            <span 
                :class="!rightText ? '' : 'active'"
                v-text="rightText ? '已授信' : '未认证'"
            ></span>
            <!-- right => icon -->
            <i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>

        <ms-hint :isShow="isShowHint" :isText="isShowText"></ms-hint>
    </a>
</template>

<script>
import Hint from '@/components/common/hint';

export default {
    name: 'panelitem',

    data() {
        return {
            isShowHint: false,
            isShowText: ''
        }
    },

    props: {
        leftText: [String],
        rightText: [Boolean],
        iconCode: [String],
        url: [String],
        authStatus: [Boolean]
    },

    components: {
        msHint: Hint
    },

    methods: {
        jumpUrl() {

            // 跳转个人信息
            if ( this.iconCode === 'userinfo' ) {
                this.$router.push(`/information?userId=${this.$route.query.userId}`);
            }

            if ( this.authStatus && this.iconCode !== 'lianxiren' ) {
                this.isShowHint = !this.isShowHint;
                this.isShowText = `${this.leftText}已授权`;
                return;
            }; 
        }
    }
}
</script>

<style lang="less" src="./index.less" scoped>

</style>