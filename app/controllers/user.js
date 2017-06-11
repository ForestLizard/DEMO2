/**
 * Created by Administrator on 2017/5/17.
 */
/*负责用户相关业务逻辑控制*/

var User = require("../models/user");

exports.list = function(req,res){
    User.fetch(function(err,users){
        if (err) {
            console.log(err);
        }

        res.render('userlist',{
            title:'用户列表页',
            users:users
        })
    })
};

exports.regVal = function(req,res){
    var userName = req.body.user.name;

    User.findOne({name: userName},function(err,user){
        if(err){
            console.log(err);
        }
        if(!user){
            res.send(true);
        }else{
            res.send(false);
        }
    })
};

exports.reg = function(req,res){
    var _user = req.body.user;
    delete _user.confirmPassword;
    var user = new User(_user);
    user.save(function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
};

exports.loginVal = function(req,res){
    var _user = req.body.user;
    User.findOne({name: _user.name},function(err,user){
        if(err){
            console.log(err);
        }

        if(!user){
            res.send(false);
        }else{
            user.comparePassword(_user.password,function(err,isMatch){
                if(err){
                    console.log(err);
                }
                if(!isMatch){
                    res.send(false);
                }else{
                    res.send(true);
                }
            });
        }

    });

};

exports.login = function(req,res){
    var _user = req.body.user;
    User.findOne({name:_user.name},function(err,user){
        if(err){
            console.log(err);
        }
        req.session.user = user;/*保持用户登录状态*/
        res.redirect("/");
    });

};

exports.logout = function(req,res){
    delete req.session.user;

    res.redirect("/");
};


    /*用户权限控制*/
exports.isLogin = function(req,res,next){
    if(!req.session.user){
        res.send("请登录后再访问");
    }else{
        next();
    }

};

exports.isAdmin = function(req,res,next){
    var user = req.session.user;
    if(user.role < 10 ){
        res.send("您没有管理员权限");
    }else{
        next();
    }
};