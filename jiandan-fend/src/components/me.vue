<template lang="pug">
    .me
        .hrader
          mu-row(justify-content='center')
            mu-avatar(:size='size')
              img(src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2176837628,926516992&fm=27&gp=0.jpg')
          p 炒蛋贩子
          p.describtion 这个人很懒，什么都没有描述......

        .content
            mu-flex(justify-content='center')
              mu-button(@click='openSimpleDialog1') 
                p 客服中心
            mu-dialog(title='提示', width='360', :open.sync='openSimple1')
              | 客服电话：15155215262
              mu-button(slot='actions', flat='', color='primary', @click='closeSimpleDialog1') 关闭
            mu-flex(justify-content='center')
              mu-button(@click='openSimpleDialog2') 
                p 帮助中心
            mu-dialog(title='提示', width='360', :open.sync='openSimple2')
              | 遇到问题，可以多多刷新网络来解决问题（服务器太遥远了......）
              mu-button(slot='actions', flat='', color='primary', @click='closeSimpleDialog2') 关闭
            mu-flex(justify-content='center')
              mu-button(@click='openSimpleDialog') 
                p 关于我们
            mu-dialog(title='提示', width='360', :open.sync='openSimple')
              | 炒蛋是一个集煎蛋网，加段子网以及花瓣网图片合成的一款App，制作人员就是闲时制作，不追求法律责任。
              mu-button(slot='actions', flat='', color='primary', @click='closeSimpleDialog') 关闭
</template>

<script>
export default {
    mounted() {
        this.$parent.$data.isShow = false
    },
    beforeRouteLeave (to, from, next) {
        this.$parent.$data.isShow = true
        next()
    },
    data(){
        return{
            openSimple2: false,
            openSimple1: false,
            openSimple: false,
            size:80
        }
    },
    methods: {
        openSimpleDialog () {
        this.openSimple = true;
        },
        closeSimpleDialog () {
        this.openSimple = false;
        },
        openSimpleDialog1 () {
        this.openSimple1 = true;
        },
        closeSimpleDialog1 () {
        this.openSimple1 = false;
        },
        openSimpleDialog2 () {
        this.openSimple2 = true;
        },
        closeSimpleDialog2 () {
        this.openSimple2 = false;
        }
    }
}
</script>
<style lang="less" scoped>
@import "./../assets/css/page/me.less";

</style>
