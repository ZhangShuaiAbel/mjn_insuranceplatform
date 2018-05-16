<template>
    <div class="popup">
        <ms-mask :isShow="isShow" v-show="isShow">
            <div class="popup_content" @click.stop="prevent" :style="{bottom: position}" ref="popupElement">
                <slot></slot>
            </div>
        </ms-mask>
    </div>
</template>

<script>
import Mask from '@/components/root/mask';

export default {
    data: function () {
        return {
            position: null,
            isPosition: null
        }
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    components: {
        "msMask": Mask
    },
    mounted() {},
    methods: {
        prevent() {}
    },
    watch: {
        isShow(props) {
            this.$nextTick(function () {
                if ( props ) {
                    this.position = `${-this.$refs.popupElement.offsetHeight - 30}px`;
                    this.isPosition = `${-this.$refs.popupElement.offsetHeight - 30}px`;
                    setTimeout(function () {
                        this.position = `0px`;
                    }.bind(this),1)
                }else {
                    this.position = this.isPosition;
                }
            })
        }
    }
}
</script>

<style lang="less" src="./index.less">

</style>