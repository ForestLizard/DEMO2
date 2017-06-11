/**
 * Created by Administrator on 2017/3/18.
 */
var mongoose=require('mongoose');

var MovieSchema = new mongoose.Schema({
    title:String,
    director:String,
    country:String,
    lan:String,
    summary:String,
    poster:String,
    flash:String,
    year:Number,
    pv: {
        type: Number,
        default: 0
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


MovieSchema.pre('save',function(next){
   if (this.isNew) {
       this.meta.createAt = this.meta.updateAt = Date.now();
   }else{
       this.meta.updateAt = Date.now();
   }
    next();
});/*每次存储数据前都会调用这个方法*/

/*集合的静态方法*/
MovieSchema.statics = {
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

module.exports = MovieSchema;