$(document).keyup(function (event) {
    if (event.keyCode === 13) {
        if ('' === $("#username").val()) {
            $("#username").focus();
            return;
        } else if ('' === $("#password").val()) {
            $("#password").focus();
            return;
        } else {
            login();
        }
    }

});

window.onload = function () {
    if (self !== top) {
        //不是顶层页面
        alert("您的登陆已超时，请重新登陆！");
        top.location.href = binfo.util.net.getURL() + "/login.html";
    }
};

$(function () {
    var result = binfo.net.ajaxData("post","/dictionary/get/系统配置/系统名称",{});
    if (result.status) {
        $("#project-name").html(result.data.value);
    }
});

/**
 * 用户登录
 */
function login() {
    var username = $('input#username').val();
    var password = $('input#password').val();
    binfo.net.asyncAjaxData("POST", "/user/login", {
        loginName: username,
        password: password
    }, function (data) {
        if (data.status) {
            console.log(data);
            window.location = binfo.util.net.getURL() + "/index.html";
        } else {
            alert(data.data);
        }
    });
}