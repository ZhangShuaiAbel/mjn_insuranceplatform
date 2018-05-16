<template>
    <div class="toast" v-show="isShow">
        <div class="toast_content">
            <p class="fa fa-spinner fa-spin toast_content_icon"></p>
            <p v-text="text"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: '努力加载中'
        }
    }
}
</script>

<style lang="less" src="./index.less"></style>