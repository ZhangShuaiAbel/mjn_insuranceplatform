<template>
    <div class="slide" v-show="dataSource.length > 0">
        <div class="wrapper" ref="wrapper">
            <ul class="content" :style="{width: calcStyleWidth}" >
                <li 
                    class="item"
                    v-for="(item,index) in dataSource" 
                    :key="index"
                    :style="{ background: 'url(' + item.path + ')' + 'center center no-repeat' }"
                ></li>
            </ul>

            
        </div>

        <div class="page_number">
          <span>{{slideIndex}}</span>
          <span>/</span>
          <span>{{dataSource.length}}</span>
        </div>
        
    </div>
</template>

<script>
import Bscroll from "better-scroll";
import { bus, busType } from "@/bus";
export default {
  name: "slide",
  data() {
      return {
          slideIndex: 1
      }
  },
  props: {
    dataSource: {
      type: Array,
      default: function () {
          return [1]
      }
    },
    baseUrl: {
      type: String,
      default: ''
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  computed: {
      calcStyleWidth() {
          return `${this.dataSource.length}00%`;
      }
  },
  mounted() {
    this.$nextTick(() => {
      this._initSlide();
    });
    
  },
  methods: {
    _initSlide() {
      this.slide = new Bscroll(this.$refs.wrapper, {
        scrollX: true,
        momentum: false,
        eventPassthrough: "vertical",
        click: false,
        preventDefaultException: {
          tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
        },
        snap: true
      });

     this.slide.on('scrollEnd',function (ev) {
        this.slideIndex = this.slide.getCurrentPage().pageX + 1;
     }.bind(this));
    }
  }
};
</script>

<style lang="less" src="./index.less" scoped>

</style>