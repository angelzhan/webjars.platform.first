var platform = {};
/**
 * 获取当前用户
 */
platform.user = {};
platform.user.getCurrentUser = function () {
    var userData = binfo.net.ajaxData("post", "/user/getCurrentUser", {});
    if (userData.status) {
        return userData.data;
    }
};