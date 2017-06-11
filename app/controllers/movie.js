/*Created by Administrator on 2017/5/17.*/
/*负责电影相关业务逻辑控制*/

var _ =require('underscore');/*新对象中的字段替换老对象中相应的字段*/
var Movie = require('../models/movie');
var Comment = require('../models/comment');
var fs =require("fs");/*文件系统模块*/



exports.detail = function(req,res){


    var id = req.params.id;

    Movie.findById(id,function(err,movie){
        /*统计访问次数*/
        movie.pv++;
        movie.save(function(err){
            if(err){
                console.log(err);
            }
        });

        Comment.find({movie: movie._id})
            .sort('-meta.createAt')
            .populate("from reply.from reply.to","name")
            .exec(function(err,comment){
            res.render('detail',{
                title:'MoviesShare '+ movie.title,
                movie:movie,
                comment: comment
            })
        });

    });
};

exports.entry = function(req,res){
    res.render('admin',{
        title: 'MoviesShare 后台录入页',
        movie:{
            title:'',
            director:'',
            country:'',
            lan:'',
            year:'',
            poster:'',
            flash:'',
            summary:''
        }
    });
};

exports.update = function(req,res){
    var id= req.params.id;

    if (id) {
        Movie.findById(id,function(err,movie){
            res.render('admin',{
                title: 'MoviesShare 后台更新页',
                movie: movie
            });

            console.log(movie);
        });

    }
};

exports.savePoster = function(req,res,next){

    var posterData = req.files.upLoadPoster;/*通过files.name拿到上传的文件*/

    console.log(posterData);
    if(posterData.originalFilename){
        var timestamp = Date.now();
        var newPath = __dirname + "/../../public/upload/poster/" + timestamp + "." + posterData.type.split("/")[1];

        fs.rename(posterData.path,newPath,function(err){
            req.moviePoster = "/upload/poster/" + timestamp + "." + posterData.type.split("/")[1]; /*上传的海报路径挂到req上，实现传递*/
            next();
        });

    }else{
        next();
    }

};




exports.new = function(req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if(req.moviePoster){
        movieObj.poster = req.moviePoster;
    }


    if (id !=='undefined') {
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }

            _movie = _.extend(movie,movieObj);/*，这个电影原来有，用旧的电影文档被替换成新的，前者是查询出来的旧数据，后者是新录入的数据,_movie是数据库的一条文档对象*/
            _movie.save(function(err,movie){
                if (err){
                    console.log(err);
                }

                res.redirect('/movie/'+movie._id);
            })
        })
    }else{
        _movie =new Movie({
            title:movieObj.title,
            director:movieObj.director,
            country: movieObj.country,
            lan: movieObj.lan,
            year:movieObj.year,
            poster:movieObj.poster,
            flash:movieObj.flash,
            summary:movieObj.summary
        });/*这个电影原来没有，重新录入*/
        _movie.save(function(err,movie){
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/'+movie._id);
        })
    }

};

exports.list = function(req,res){
    Movie.fetch(function(err,movies){
        if (err) {
            console.log(err);
        }

        res.render('movielist',{
            title:'MoviesShare 列表页',
            movies:movies
        })
    })
};

exports.delete = function(req,res){
    var id = req.body.id;
    console.log(id);
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if (err) {
                console.log(err);
            }else{
                res.json({
                    success:true
                })
            }


        });
    }
};