<template lang="pug">
    .welcome
        .welcom-top
            swiper(:options='swiperOption', ref='mySwiper')
                //- slides
                swiper-slide 
                  img(src='../assets/img/qd1.png')
                swiper-slide
                  img(src='../assets/img/qd2.png')
                swiper-slide
                  img(src='../assets/img/qd3.png')
                //- Optional controls
                .swiper-pagination(slot='pagination')

        .welcom-bottom
           mu-flex.flex-wrapper(align-items='center',justify-content='center',direction='column') 有人的地方就有段子
            mu-button(flat='', color='primary',@click='GetIndex') 立即体验
                

</template>

<script>
export default {
    mounted() {
        this.$parent.$data.isShow = false
        this.$parent.$data.isShowBottom = false
    },
    beforeRouteLeave (to, from, next) {
        this.$parent.$data.isShow = true
        this.$parent.$data.isShowBottom = true
        next()
    },
    data () {
        return {
            message: '欢迎使用',
            swiperOption:{
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }    
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods:{
        GetIndex(){
            this.$router.replace({ path:'/index/jx' })
        }
    }
}
</script>

<style lang="less" scoped>

@import "./../assets/css/main.less";
@import "./../assets/css/page/welcome.less";

</style>


