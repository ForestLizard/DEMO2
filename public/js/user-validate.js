/**
 * Created by Administrator on 2017/5/10.
 */
$().ready(function(){
    jQuery.validator.addMethod("includeletters", function(value, element) {
        var rex = /[a-zA-z]+/;
        return this.optional(element) || (rex.test(value));
    }, "");


    $("#register").validate({
            rules: {
                "user[name]": {
                    required: true,
                    minlength: 2,
                    remote:{
                        url: "/user/register/validate",
                        type: "post",
                        dataType: "json"

                    }
                },
                "user[password]": {
                    required: true,
                    minlength: 6,
                    maxlength: 15,
                    includeletters:true
                },
                "user[confirmPassword]": {
                    required: true,
                    minlength: 6,
                    maxlength: 15,
                    includeletters:true,
                    equalTo: "#register-password"
                }

            },
            messages: {
                "user[name]": {
                    required: "请输入用户名",
                    minlength: "用户名至少由2个字母组成",
                     remote: "该用户名已被注册"
                },
                "user[password]": {
                    required: "请输入密码",
                    minlength: "密码至少由6个字母组成",
                    maxlength: "密码至多由15个字母组成",
                    includeletters:"密码至少包含一个字母"
                },
                "user[confirmPassword]": {
                    required: "请输入密码",
                    minlength: "密码至少由6个字母组成",
                    maxlength: "密码至多由15个字母组成",
                    includeletters:"密码至少包含一个字母",
                    equalTo: "两次密码输入不一致"
                }
            },
            highlight:function(element){
                $(element).addClass("invalid").removeClass("valid");

            },
            unhighlight:function(element){
                $(element).addClass("valid").removeClass("invalid");

            }

        });

    $("#login").validate({
        rules: {
            "user[password]": {
               remote: {
                   url: "/user/login/validate",
                   type: "post",
                   dataType: "json",
                   data: {
                       "user[name]": function(){
                           return $("#login-name").val()
                       }
                   }
               }
            }
        },
        messages: {
            "user[password]": {
                remote: "用户名或密码错误"
            }
        },
        highlight:function(element){
            $(element).addClass("invalid").removeClass("valid");

        },
        unhighlight:function(element){
            $(element).addClass("valid").removeClass("invalid");

        },
        onfocusout: false


    });

});