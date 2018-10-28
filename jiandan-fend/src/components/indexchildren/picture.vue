<template lang="pug">
    .picture 
      mu-grid-list.gridlist-demo
        mu-text-field(v-model='inputSearch', placeholder='输入搜索关键字', @change='changeInput')
        mu-grid-tile(v-for='(item, index) in picList', :key='index')
            img(:src='"http://img.hb.aicdn.com/"+item.file.key+"_fw236"')
            
</template>

<script>


export default {
    mounted() {
        this.GetPic()
    },
    data() {
        return{
            picList:[],
            inputSearch:null
        }
    },
    methods:{
        changeInput(){
            this.GetPic()
        },
        GetPic(){
            this.$http.Get({
                url:'huaban',
                par:{
                    q:this.inputSearch
                }
            },(res) => {
                var pic = res.data.pins
                this.picList = []
                this.picList = pic
                console.log(this.picList)
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/main.less";
@import "./../../assets/css/page/picture.less";
</style>

