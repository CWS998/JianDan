// npm install express --savs-dev
const express = require("express");
const app = express();
// 引用 config.js
const conf = require("./config");
//  npm install request --save 命令行安装方法
const request = require("request");
//  npm install cheerio --save 命令行安装方法
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
//  express  request  cheerio  用法，百度可查，express官网，npm官网
// 头部文件，引用依赖包

app.use(express.static("img"));

// 使用 bodyParser 插件 app.body 请求中间介
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
*express 设置跨域请求头
*/
app.all("*", function(req, res, next) {
  // 设置请求来源
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  // 设置请求方式
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 返回请求结果，可自定义
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.send(200);
  /*让options请求快速返回*/ else next();
});

/**
 * 获取煎蛋网，段子内容
 * 访问地址：http://127.0.0.1:8088/index?page=70
 * 获取段子评论：http://jandan.net/tucao/3984420
 * 获取段子
 */
app.get("/index", function(req, res) {
  // pageid 在后端要手动在地址栏中输入 例： http://127.0.0.1:8088/?page=70  使用  GET 传值方法  ？page=
  // req.query 接收 GET 的传值，值是一个数组形式
  let URL = null, pageid = req.query.page;
  // req.query.page >= 0 ? URL = `${conf.IndexUrl}/page-${pageid}` :  URL =  `${conf.IndexUrl}`
  //console.log(req.query.page);

  // request 发送数据请求，抓取整个 HTML 页面
  request(`${conf.Indexurl}${pageid}`, function(error, response, body) {
    // 定义 ' $ ' 用来将抓取的 HTML 页面，转换格式
    const $ = cheerio.load(body);
    // console.log($)

    // express 写法，定义 List 接收数据里面指定位置数据  .commentlist li 意思是指，类 commentlist 下面 li 位置
    let List = $(".commentlist li");
    // console.log(List);
    // 定义 dzlist 数组
    let dzlist = [];
    // cheerio 提供的 .each 方法
    List.each(function(index, ele) {
      // dzlist 数组存放循环数据，并且定义 key 值， index 数组下标
      dzlist.push({
        id: index + 1,
        // $(this) 指向 function 里的 ele， .find 查找指定位置， .text 获取指定位置数据
        postid: $(this)
          .find(".text a")
          .text(),
        author: $(this)
          .find(".author strong")
          .text(),
        headimg: `${conf.domain}${index + 1}.jpg`,
        pubtime: $(this)
          .find(".author small a")
          .text(),
        like: $(this)
          .find(".tucao-like-container span")
          .text(),
        unlike: $(this)
          .find(".tucao-unlike-container span")
          .text(),
        content: $(this)
          .find(".text p")
          .text()
      });
    });
    // 将 dzlist 里的数据以 json 格式发送到前端，res.json experss 语法
    res.json({
      datas:dzlist,
      status: 200,
      maxPage: (($(".cp-pagenavi .current-comment-page").text()).replace(/[^0-9]/ig,"")).substring(0,2)
    });
  });
});

app.get("/huaban", function(req, res) {
  
  let q = encodeURI(req.query.q);

  // console.log(q)
  var options = {
    url: `http://huaban.com/search/?q=${q}&jnddp7px&page=4&per_page=50&wfl=1`,
    headers: {
      'Accept': 'application/json',
      // 'Accept-Language': 'zh-CN,zh;q=0.9',
      'Host': 'huaban.com',
      'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0)',
      'X-Request': 'JSON',
      'X-Requested-With': 'XMLHttpRequest'
    }
  };
  // req.query.page >= 0 ? URL = `${conf.IndexUrl}/page-${pageid}` :  URL =  `${conf.IndexUrl}`
  //console.log(req.query.page);

  // request 发送数据请求，抓取整个 HTML 页面
  request(options, function(error, response, body) {
    // 定义 ' $ ' 用来将抓取的 HTML 页面，转换格式
    const $ = JSON.parse(body);
    // let huaList = [];
    // for(var i=0;i<$.pins.length;i++){
    //   huaList.push($.pins[i].user)
    // }
    res.json($)

   
  });
});


// 获取相应段子的评论，返回 json 数据
// api：http://127.0.0.1:8088/tucao?postid=3984420

app.get("/tucao", function(req, res) {
  let postid = req.query.postid;
  request(`${conf.TuCaourl}${postid}`, function(error, response, body) {
    res.json(JSON.parse(body));
  });
});

/**
 * 实现快手视频 json
 */
app.get("/profile", function(req, res) {
  let userid = req.query.userid;
  request(`${conf.kuaiShou}${userid}`, function(error, response, body) {
    var data = body.match(/VUE_MODEL_INIT_STATE\[\'profileGallery\'\]=([\s\S]*?);/)[1]
    res.json(JSON.parse(data));
  });
});
/**
 * 实现发布新的段子内容功能
 * 接口，内容，在相应网站自己测试后去 Network 找
 * api：http://127.0.0.1:8088/comment
 */

app.post("/comment", function(req, res) {
  console.log(req.body)
  // formData 是在 Network 返回结果中找到的用户发送函数
  // requset.post 用法 npm 官网查找
  var formData = {
    author: req.body.author,
    email: req.body.email,
    comment: req.body.comment,
    comment_post_ID: "55592"
  };
  request.post(
    { url: `${conf.Commenturl}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      res.json({
        status: "200",
        postid: body
      });
    }
  );
});

/**
 * 实现对发布吐槽的功能
 */
app.post("/SetPostcomment", function(req, res) {
  // console.log(req.body)
  // formData 是在 Network 返回结果中找到的用户发送函数
  // requset.post 用法 npm 官网查找
  var formData = {
    author: req.body.author,
    email: req.body.email,
    comment: req.body.comment,
    comment_id: req.body.comment_id
  };
  request.post(
    { url: `${conf.TuCaoComment}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      res.json({
        status: "200",
        postid: body
      });
    }
  );
});

/**
 * 实现对帖子的点赞功能
 */
app.post("/like", function(req, res) {
  // formData 是在 Network 返回结果中找到的用户发送函数
  // requset.post 用法 npm 官网查找
  let type = req.body.type;
  var formData = {
    comment_id: req.body.postid,
    data_type: "comment"
  };
  if ( type=='like' ) {
    formData.like_type = 'pos'
  } else {
    formData.like_type = 'neg'
  }
  request.post(
    { url: `${conf.LikeUrl}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      res.json({
        status: "200",
        postid: body
      });
    }
  );
});

// 将程序运行在本地服务器 8088 的端口
app.listen(8088, function() {
  console.log("Example app listening on port 8088!");
});

// console.log(conf);
