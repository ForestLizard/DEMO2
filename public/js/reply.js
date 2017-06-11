/**
 * Created by Administrator on 2017/5/21.
 */
/*回复*/
$(".reply").click(function(e){
    e.preventDefault();
    $(this).prev().fadeIn();
    $(this).parent().next().fadeIn();
});

$(".pack").click(function(e){
    e.preventDefault();
    $(this).fadeOut();
    $(this).parent().next().fadeOut();
});

$(".reply-form a").click(function(e){
    e.preventDefault();
    var presentForm = $(this).closest("form");
    var presentReplyBox = $(this).closest(".media-main").find(".reply-box");

    if(presentForm.find("textarea").val()){
        presentForm.find(".alert").fadeOut();
        $.ajax({
            url: "/comment/new/replay",
            type: "post",
            data: {
                "reply[from]": function(){
                    return $("#comment-from").val();
                },
                "reply[to]": function(){
                    return presentForm.find("input:eq(0)").val();
                },
                "reply[content]": function(){
                    return presentForm.find("textarea").val();
                },
                "comment_from": function(){
                    return presentForm.find("input:eq(2)").val();
                }
            }
        }).done(function(res){
            if(res.success){
                var time = new Date();
                presentReplyBox.append('<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="#">' +
                    '<img class="media-object img-circle" src="../images/portrait_example1.jpeg" alt="用户头像" />' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">' + $("#comment-from-name").val() + ' 回复 ' + presentForm.find("input:eq(1)").val()+'</h4>' +
                    '<p>' + presentForm.find("textarea").val() + '</p>' +
                    '<small>' + '时间：' + time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate() + '</small>'+
                    '</div>' +
                    '</div>' +
                    '<hr />')
            }
        });
    }else{
        presentForm.find(".alert").fadeIn();
    }
});