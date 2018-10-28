<template lang="pug">
  #app
    v-navbar(v-if='isShow')
    router-view(v-if="isRouterAlive")
    v-bottomnav(v-if='isShowBottom')


</template>

<script>

import NavBarComponts from "./components/tpl/navbar.vue";
import BottomNavComponts from "./components/tpl/bottomnav.vue"

export default {
  name: 'App',
  provide (){
      return {
          reload: this.reload
      }
  },
  data () {
    return {
      isShow : true,
      isShowBottom: true,
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新页面
    // Vue的刷新页面不是使用传统的方式：具体参考这篇教程：
    // https://blog.csdn.net/qq_16772725/article/details/80467492
    // Vue 官方教程：https://cn.vuejs.org/v2/api/#provide-inject
    reload () {
        this.isRouterAlive = false;
        this.$nextTick(function(){
        this.isRouterAlive = true;
        })
    }
  },
  components:{
    'v-navbar' : NavBarComponts,
    'v-bottomnav' : BottomNavComponts
  }
}
</script>

<style lang="less">
html,body,#app{
    width: 100%;
    height: 100%;
}
body{
  background-color: #fff !important;
}
.swiper-container,.swiper-wrapper{
    width: 100%;
    height: 100%;
}
.mu-bottom-nav{
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
.mu-button{
  width: auto;
}
.mu-progress {
  position: fixed !important;
  z-index: 999 !important;
}
.mu-grid-tile-titlebar{
    position: absolute !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    height: 48px !important;
    background-color: rgba(0, 0, 0, 0) !important; 
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-box-align: center !important;
    -ms-flex-align: center !important;
    align-items: center !important;
}
</style>

