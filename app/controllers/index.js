/**
 * Created by Administrator on 2017/5/17.
 */
/*负责首页业务逻辑控制*/
var Movie = require('../models/movie');

exports.index = function(req,res){

    Movie.fetch(function(err,movies){
        if (err){
            console.log(err);
        }
        res.render('index',{
            title: 'MoviesShare 首页',
            movies: movies

        })
    });
};

