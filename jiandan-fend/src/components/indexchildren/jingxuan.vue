<template lang="pug">
  .index-duanzi
   mu-load-more(@refresh="refresh", :refreshing="refreshing", :loading="loading", @load="load")
    .duanzi(v-for='(item,index) in dataList' :key='index')
      .duanziheader
        img(:src='item.headimg')
        span {{ item.author }}
      .duanzicontent {{ item.content }}
      .duanziaction
        .action-left 
          mu-button(fab='', small='', color='#81d4fa', @click='isLike("like",index,item.postid)')
            mu-icon(value='thumb_up')
          span.like {{ item.like }}
          mu-button(fab='', small='', color='#cfd8dc', @click='isLike("unlike",index,item.postid)')
            mu-icon(value='thumb_down')
          span.unlike {{ item.unlike }}
        .action-right 
           mu-button(fab='', small='', color='#ffd54f', @click='GetComment(index, item.postid)')
            mu-icon(value='comment')
      .duanicomment(v-if='isShowComment && index == clickSaveid ')
        span.title - 评论 -
        .list(v-for='(items,index) in commentList' :key='index')
          h4 {{ index + 1 }}：{{ items.comment_author }}
          span(v-html='items.comment_content')
        .hiddenlist
          h4(@click='GetComment(index, item.postid)') 收回
        mu-form.mu-demo-form(ref='form', :model='validateForm')
          mu-form-item(label='发表评论', help-text='点出输入框，自动发表评论', prop='comment', :rules='commentRules')
            mu-text-field(v-model='validateForm.comment', prop='comment', @change='SetComment(item.postid)')
</template>

<script>
export default {
  inject: ['reload'],
  mounted() {
    localStorage.setItem('name', 'cws')
    localStorage.setItem('email', '1396679@qq.com')
    this.GetData()
  },
  data() {
    return {
      dataList:[],
      commentList:[],
      isShowComment:false,
      HiddenOrShow:false,
      clickSaveid: null,
      validateForm: {
          comment: ''
      },
      commentRules: [
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      num: 0, // 最关键的num数值
      refreshing: false,
      loading: false,
    };
  },
  methods:{
    // 下拉到底部加载数据时候触发
      load () {
        this.loading = true;
        setTimeout(() => {
          // 显示加载圈
          this.loading = false;
          // 自减num
          this.num-=1;
          // 获取数据
          this.GetData()
        }, 2000)
      },
      // 顶部下拉刷新页面
      refresh () {
        this.refreshing = true;
        setTimeout(() => {
          this.refreshing = false;
          // 刷新页面
          this.reload()
        }, 2000)
      },
    // 请求页面数据
    GetData(){
      this.$http.Get({
        url:'/index',
        par:{
          page:this.num
        }
      },(res) => {
        // console.log(res)
        this.num = parseInt(res.data.maxPage)
        // 拼接数据请求地址
        this.dataList = this.dataList.concat(res.data.datas)
      })
    },
    // 获取相应评论数据
    GetComment(id, postid){
      this.clickSaveid = id
      if (this.HiddenOrShow) {
        this.HiddenOrShow = false
        this.isShowComment = false
      } else {
        this.$http.Get({
          url:'/tucao',
          par:{
            postid:postid
          }
        },(res) => {
          this.commentList = res.data.tucao
          this.HiddenOrShow = true
          this.isShowComment = true
        })
      }
    },
    // 点赞是否喜欢的请求接口
    isLike(action,id,postid){
      this.$http.Post({
            url: "like",
            par: {
              postid: postid,
              type: action
            }
          },res =>{
            var status = JSON.parse(res.data.postid)
            console.log(status)
            if(status.error == 0){
              if(action == 'like'){
                this.dataList[id].like = parseInt(this.dataList[id].like) + 1
                this.$toast.success('点赞成功')
              }else {
                this.dataList[id].unlike = parseInt(this.dataList[id].unlike) + 1
                this.$toast.success('吐槽成功')
              }
            }else {
              this.$toast.warning('你已经投过票了');
            }
          })
    },
    // 发布评论接口
    SetComment(postid){
     if (localStorage.getItem('name') != null && localStorage.getItem('email') != null && this.validateForm.comment != 0) {
       this.$http.Post({
         url:'SetComment',
         par:{
            author: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            comment: this.validateForm.comment,
            comment_id: postid
         }
       },(res) => {
          if(res.data.status == 200){
            // console.log(res)
            this.$toast.success({
              position: 'top',
              message: "评论发送成功!"
           })
           this.validateForm.comment = null
          }
       })
     } else {
        this.$toast.error({
          position: 'top',
          message: "未登录&信息不能为空!"
        })
     }
    }
  }
}
</script>

<style lang="less" scoped>
@import "./../../assets/css/main.less";
@import "./../../assets/css/page/jingxuan.less";
</style>
