/**
 * Created by Administrator on 2017/5/7.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var User = mongoose.model('User',UserSchema);/*生成模型,第一个参数为模型名字,它小写复数形式就是数据库里集合的名字,是一个对象*/

module.exports=User;