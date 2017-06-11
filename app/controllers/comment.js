/**
 * Created by Administrator on 2017/5/19.
 */
var User = require("../models/user");
var Comment = require("../models/comment");


exports.new = function(req,res){
    var _comment = req.body.comment;
    var comment = new Comment(_comment);

    comment.save(function(err){
        if(err){
            console.log(err);
        }
        res.json({
            success: true
        })
    });
};


exports.newReply = function(req,res){
    var reply = req.body.reply;
    var comment_from = req.body.comment_from;

    reply.meta = {};
    reply.meta.createAt= reply.meta.updateAt = Date.now();


    console.log(comment_from);
    Comment.findById(comment_from,function(err,comment){
        if(err){
            console.log(err);
        }
        if(!comment.reply){
            comment.reply = [];
        }
        comment.reply.push(reply);
        comment.save(function(err){
            if(err){
                console.log(err);
            }
            res.json({
                success: true
            })
        });

    });


};