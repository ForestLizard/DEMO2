/**
 * Created by Administrator on 2017/3/16.
 */
var express=require('express');
var path=require('path');
var session = require("express-session");/*引入session*/
var mongoose = require('mongoose');
var mongoStore = require("connect-mongo")(session);/*用来将session存储到mongoDB*/
var bodyParser=require('body-parser');/*表单数据格式化*/
var multipart = require('connect-multiparty');/*复合表单上传,接收表单上传的文件*/
var morgan = require("morgan");/*日志打印模块*/





var app=express();/*实例化模块对象*/
var port=process.env.PORT||3000;

var dbUrl = "mongodb://localhost:27017/movie_db";
mongoose.connect(dbUrl);/*数据库名字叫movie_db*/

/*配置不同环境（如本地环境或线上测试环境或正式生产环境）*/
if("development" === app.get("env")){/*如果是在开发环境下而非,输出日志*/
    app.set("showStackError",true);
    app.use(morgan("dev"));/*输出出日志，每个请求的情况*/
    app.locals.pretty = true;/*将通过jade渲染出来的HTML格式化，使之有缩进*/
    mongoose.set("debug",true);/*mongoose debug模式*/
}


app.set('views','./app/views/pages');             //指定视图所在的位置
app.set('view engine','jade');               //模板引擎

app.use(bodyParser.urlencoded({extended: true}));/*表单数据格式化*/
app.use(multipart({uploadDir:'./public/upload' }));/*复合表单上传,接收表单上传的文件,uploadDir为上传文件临时存放的地址*/
app.use(express.static(path.join(__dirname,'public')));/*静态资源入口：__dirname表示当前文件夹*/
app.use(session({
    secret:'movieSharing',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collection: "sessions"
    })
}));

require("./config/routes")(app);

app.locals.moment = require('moment');
app.listen(port);

console.log('start on port '+port);




