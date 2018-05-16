<template>
    <div class="validation" v-show="isFoShow">
        <div class="container" v-text="isText"></div>
    </div>
</template>

<script>
export default {
    name: 'hint',
    data() {
        return {
            isFoShow: false
        }
    },
    props: {
            isShow: {
                type: Boolean,
                default: function() {
                    return true
                }
            },
            isText: {
                type: String,
                default: function(isTextte) {
                    return isText
                }
            },
            time: {
                type: Number,
                default: function () {
                    return 2500
                }
            }
    },
    watch: {
        isShow: function (val) {
            if ( this.isFoShow ) return;
            this.isFoShow = true;
            setTimeout(function() {
                this.isFoShow = false;
            }.bind(this),this.time); 
        }
    },
}
</script>

<style lang="less" src="./index.less"></style>