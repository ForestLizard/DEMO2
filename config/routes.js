/**
 * Created by Administrator on 2017/5/16.
 */
var Test =require("../app/controllers/test");
var Index =require("../app/controllers/index");
var Movie =require("../app/controllers/movie");
var User = require("../app/controllers/user");
var Comment = require("../app/controllers/comment");



module.exports = function(app){

//预处理，加载用户信息
    app.use(function(req,res,next){
        app.locals.user = req.session.user;/*app.locals中的变量能被模板引用*/
        next();
    });

/*test*/
    app.get('/test',Test.test1);

/*index*/
    app.get('/',Index.index);

/*movie*/
    app.get('/movie/:id',Movie.detail);
    app.get('/admin/movie',User.isLogin,User.isAdmin,Movie.entry);
    app.get('/admin/movie/update/:id',User.isLogin,User.isAdmin,Movie.update);
    app.post('/admin/movie/new',Movie.savePoster,Movie.new);
    app.get('/admin/movie/list',User.isLogin,User.isAdmin,Movie.list);
    app.delete('/admin/movie/list',Movie.delete);

/*user*/
    app.get("/admin/user/list",User.isLogin,User.isAdmin,User.list);
    app.post("/user/register/validate",User.regVal);
    app.post('/user/register',User.reg);
    app.post("/user/login/validate",User.loginVal);
    app.post("/user/login",User.login);
    app.get("/user/logout",User.logout);

/*comment*/
    app.post("/comment/new",Comment.new);
    app.post("/comment/new/replay",Comment.newReply);

};

