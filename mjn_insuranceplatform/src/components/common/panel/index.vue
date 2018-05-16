<template>
    <div class="panel" v-show="isShow">
        <div class="panel_title">
            <div class="panel_title_text" v-text="title"></div>
            <div 
                class="panel_title_status_1"
                v-if="title === '基础认证'"
            >
                <span v-text="calcRatio.creditLength"></span><span>/</span><span v-text="calcRatio.length"></span>
            </div>
            <div 
                class="panel_title_status_2"
                v-else-if="title === '必要认证'"
            >(至少认证一项)</div>
            <div 
                class="panel_title_status_3"
                v-else
            >(选填)</div>
        </div>
        <ms-panel-item
            v-for="(item,index) in dataSource"
            :key="index"
            :leftText="item.authName"
            :rightText="item.authStatus"
            :iconCode="item.authCode"
            :url="item.authUrl"
            :authStatus="item.authStatus"
        ></ms-panel-item>
    </div>
</template>

<script>
import panelItem from '@/components/root/panelitem';

export default {
    name: 'panel',

    props: {
        isShow: [Boolean],
        title: [String],
        dataSource: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },

    computed: {
        calcRatio() {
            if ( this.title === '基础认证' ) {
                let length = this.dataSource.length;
                let arr = [];
                this.dataSource.forEach((item,index) => {
                    if ( item.authStatus ) {
                        arr.push(item.authName);
                    }
                });
                return {
                    length,
                    creditLength: arr.length
                }
            }
            
        }
    },

    components: {
        'msPanelItem': panelItem
    }
}
</script>

<style lang="less" src="./index.less" scoped> </style>