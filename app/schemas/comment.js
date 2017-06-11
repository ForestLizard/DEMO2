/**
 * Created by Administrator on 2017/5/18.
 */
var mongoose=require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var CommentSchema = new mongoose.Schema({
    /*评论的电影*/
    movie: {
        type: ObjectId,
        ref: "Movie"
    },
    /*评论人，来自谁*/
    from: {
        type: ObjectId,
        ref: "User"
    },
    /*回复*/
    reply: [{
        from: {
            type: ObjectId,
            ref: "User"
        },
        to: {
            type: ObjectId,
            ref: "User"
        },
        content: String,
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
    }],
    content: String,
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


CommentSchema.pre('save',function(next){
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else{
        this.meta.updateAt = Date.now();
    }
    next();
});/*每次存储数据前都会调用这个方法*/

/*集合的静态方法*/
CommentSchema.statics = {
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

module.exports = CommentSchema;