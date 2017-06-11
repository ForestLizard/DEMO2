/**
 * Created by Administrator on 2017/5/19.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');

var Comment = mongoose.model('Comment',CommentSchema);/*生成模型,第一个参数为模型名字*/

module.exports=Comment;