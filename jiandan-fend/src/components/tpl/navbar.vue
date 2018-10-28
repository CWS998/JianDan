<template lang="pug">
    //- mu-appbar(style='width: 100%;', color='cyan300')
    //-     mu-button(icon='', slot='left')
    //-         mu-icon(value='menu') 首页
    //-     mu-button(flat='', slot='right') LOGIN
    .nav-bar-menu
        //- mu-linear-progress(:value='linear', mode='determinate', color='green')
        .scorll
            ul
              li
                router-link(to="/index/jx") 精选
              li
                router-link(to="/index/video") 视频
              li
                router-link(to="/index/pic") 纯图
              //- li
              //-   router-link(to="/index/text") 纯文
              //- li
              //-   router-link(to="/index/selected") 直播

</template>

<script>
export default {
  //   data () {
  //     return {
  //       linear: 10
  //     }
  //   },
  //   created () {
  //     this.timer = setInterval(() => {
  //       this.linear += 10;
  //       if (this.linear > 100) this.linear = 0;
  //     }, 1000)
  //   },
  //   beforeDestroy () {
  //     if (this.timer) clearInterval(this.timer);
  //   }
  }
</script>

<style lang="less" scoped>
@import "../../assets/css/main.less";
@import "../../assets/css/page/navbar.less";
</style>



