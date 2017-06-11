/**
 * Created by Administrator on 2017/3/18.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');

var Movie = mongoose.model('Movie',MovieSchema);/*生成模型,第一个参数为模型名字*/

module.exports=Movie;