<template>
  <div id="app">
    <header>
      <div class="header">
        <div class="logo"></div>
        <router-link to="/home" class="a-link">首页</router-link>
        <router-link to="/adult" class="a-link">成人</router-link>
        <router-link to="/children" class="a-link">少儿</router-link>
        <router-link to="/parent" class="a-link">父母</router-link>
        <router-link to="/cheats" class="a-link">秘籍</router-link>
        <div class="my-bao"><router-link to="/travel">我的保险</router-link></div>
        <div class="login"><router-link to="/login">登录</router-link>/<router-link to="/register">注册</router-link></div>
      </div>

    </header>

    
    <div class="wrap">
      <transition :name="transitionName" mode="out-in">
        <router-view class="conter"></router-view>
      </transition>
      <template>
        <BackTop :height="100" :bottom="200">            
            <div class="top">返回顶端</div>
        </BackTop>
    </template>
    </div>
  </div>
</template>

<script>
import * as connectURL from "@/http/common/connectURL";
export default {
  name: "app",
  data() {
    return {
      transitionName: 'fade',
      ind: '',
    };
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style lang="less">
@import "./less/core.less";
body{
  overflow-y:scroll;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f2f2f2;
}

.wrap, .conter {
  width: 1200px;
  margin: 0 auto;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-enter-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: .1s;
}


.left-enter {
  transform: translateX(100%);
}
.left-enter-to {
  transform: translateX(0%);
}
.left-leave {
  transform: translateX(0%);
}
.left-leave-to {
  transform: translateX(-100%);
}
.left-enter-active, .left-leave-active {
  transition: .2s;
}

.right-enter {
  transform: translateX(-100%);
}
.right-enter-to {
  transform: translateX(0%);
}
.right-leave {
  transform: translateX(0%);
}
.right-leave-to {
  transform: translateX(100%);
}
.right-enter-active, .right-leave-active {
  transition: .2s;
}
header{
  width: 100%;
  height: 80px;
  background:#ffffff;
  margin-bottom: 10px;
  .header{
    width: 1200px;
    margin: 0 auto;
    height: 80px;
    display: flex;
    flex-direction: row;
    .logo{
      width: 160px;
      height: 80px;
      background:url("assets/images/logo.png") no-repeat center center;
      background-size: 100% 100%; 
      margin-right: 100px;
    }
    .a-link{
      width: 68px;
      height: 30px;
      font-size: 14px;
      color: #000000;
      text-align: center;
      line-height: 30px;
      margin: 25px 38px;
      text-decoration: none;
      border-radius: 4px;
    }
    .router-link-active{
      background: #b28fce;
      color: #ffffff;
    }
    .my-bao{
      width: 90px;
      height: 28px;
      border:1px solid #b28fce;
      border-radius: 4px;
      margin: 25px 96px 25px 4px;
      text-align: center;
      line-height: 28px;
      color: #b28fce;
      font-size: 14px;
      a{
        text-align: center;
        line-height: 28px;
        color: #b28fce;
        font-size: 14px;
        text-decoration: none;
        background: #ffffff !important;
      }
    }
    .login{
      width: 72px;
      height: 80px;
      font-size: 14px;
      color: #b28fce;
      line-height: 80px;
        a{
        color: #b28fce;
        font-size: 14px;
        text-decoration: none;
        background: #ffffff !important;
      }
    }
  }
}
.top{
    padding: 10px;
    background: #caaaec;
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
</style>
