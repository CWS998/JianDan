<template lang="pug">
    .video
        mu-card(v-for='(item,index) in videoList' :key='index')
            mu-card-media
                video(:src='item.playUrl' controls)
            mu-card-text {{item.caption}}
            mu-card-actions
                mu-button(flat='') {{item.likeCount}} 喜欢
                mu-button(flat='') {{item.viewCount}} 观看

</template>

<script>
export default {
    mounted() {
        this.GetVideo()
    },
    data() {
        return{
            videoList:[]
        }
    },
    methods:{
        GetVideo(){
            this.$http.Get({
                url:'profile',
                par:{
                    userid:'Meishijia66'
                }
            },(res) => {
                var video = res.data.profile.tabDatas.open.list
                for(var i=0; i<video.length; i++){
                    if(video[i].hasOwnProperty("liveStreamId")){
                        video.splice(i,1)
                    }
                }
                this.videoList = video
                // console.log(video)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/main.less";
@import "./../../assets/css/page/video.less";
</style>
