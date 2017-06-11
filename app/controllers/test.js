/**
 * Created by Administrator on 2017/5/17.
 */
/*负责测试业务逻辑控制*/

exports.test1 = function(req,res){
    res.send('GET request to the ssshomepage');
    console.log('xx'+this.__dirname);
};