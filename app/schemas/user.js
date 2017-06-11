/**
 * Created by Administrator on 2017/5/6.
 */
var mongoose=require('mongoose');
var bcrypt = require('bcrypt');/*用于密码加密*/
var SALT_WORK_FACTOR = 10;/*加盐强度*/

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String,
    /*0~9: 普通用户
      10~: 管理员
      11~: 超级管理员
     */
    role: {
        type: Number,
        default: 0
    },
    headPortrait: {

    },
    meta:{
        createAt:{
            type: Date,
            default: Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});





UserSchema.pre('save',function(next){
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err){
            return next(err);/*前往错误处理中间件,return函数*/
        }

        bcrypt.hash(user.password,salt,function(err,hash){
            if(err){
                return next(err);/*前往错误处理中间件,return函数*/
            }

            user.password = hash;
            next();
        })

    });/*加盐哈希处理*/


});/*每次存储数据前都会调用这个方法*/


/*集合里的文档的实例方法*/

UserSchema.methods = {
    comparePassword: function(password,cb){
        bcrypt.compare(password,this.password,function(err,isMatch){
            if(err){
                cb(err);
            }else{
                cb(null,isMatch);
            }

        })
    }

};


/*集合的静态方法*/
UserSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }

};/*给这个模式对象写一些静态的方法*/

module.exports = UserSchema;