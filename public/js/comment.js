/**
 * Created by Administrator on 2017/5/20.
 */
/*评论*/

$("#subcomment").click(function(e){
    e.preventDefault();
    if($("#comment-content").val()){
        $(".alert").fadeOut();
        $.ajax({
            url: "/comment/new",
            type: "post",
            data: {
                "comment[movie]": function(){
                    return $("#comment-movie").val();
                },
                "comment[from]": function(){
                    return $("#comment-from").val();
                },
                "comment[content]": function(){
                    return $("#comment-content").val();
                }
            }
        }).done(function(res){
            if(res.success){
                var time = new Date();
                $(".comment-box").prepend('<div class="media">' +
                    '<div class="media-left">' +
                        '<a href="#">' +
                            '<img class="media-object img-circle" src="../images/portrait_example1.jpeg" alt="用户头像" />' +
                        '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                        '<h4 class="media-heading">' + $("#comment-from-name").val() + '</h4>' +
                        '<p>' + $("#comment-content").val() + '</p>' +
                        '<small>' + '时间：' + time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + '</small>'+
                    '</div>' +
                '</div>' +
                '<hr />')
            }
        });
    }else{
        $(this).closest("form").find(".alert").fadeIn();
    }

});



