$(function () {
    layui.use('element', function () {
        var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
        getMenu();
        element.render();
    });
    getProjectName();
    getCurrentUser();

});

/**
 * 获取当前用户
 */
function getCurrentUser() {
    var userData = platform.user.getCurrentUser();
    var userName = userData.userName;
    $("#username").text(userName);
}

/**
 * 获取项目名称
 */
function getProjectName() {
    var result = binfo.net.ajaxData("post", "/dictionary/get/系统配置/系统名称", {});
    if (result.status) {
        $("#title").html(result.data.value);
    }
}

/**
 * 获取菜单
 */
function getMenu() {
    var resultData = binfo.net.ajaxData("post", "/menu/0", {});
    var str = "<ul class='layui-nav layui-nav-tree layui-inline'>";
    if (resultData.status) {
        var menuData = resultData.data;
        for (var i = 0; i < menuData.length; i++) {
            var menuID = menuData[i].menuID;
            var menuName = menuData[i].menuName;
            var url = menuData[i].url;
            str += "<li class='layui-nav-item layui-nav-itemed'>" +
                "    <a class='javascript:;' href='javascript:;'";
            if (url != "/") {
                str += " onclick='turnPage(\'" + url + "\')'";
            }
            str += ">" + menuName + "   <span class='layui-nav-more'></span>" +
                "</a>" +
                "    <dl class='layui-nav-child'>";
            str += getSecondMenu(menuID);
            str += "</dl></li>";
        }
        str += "</ul>";
    }
    $("#leftNav").append(str);
}

/**
 * 获取二级菜单
 */
function getSecondMenu(parentID) {
    var resultData = binfo.net.ajaxData("post", "/menu/" + parentID, {});
    var htmlStr = "";
    if (resultData.status) {
        var menuData = resultData.data;
        for (var i = 0; i < menuData.length; i++) {
            var menuName = menuData[i].menuName;
            var url = menuData[i].url;
            htmlStr += "<dd><a href='javascript:;' onclick='turnPage(\"" + url + "\")'>" + menuName + "</a></dd>";
        }
    }
    return htmlStr;
}

/**
 * 页面跳转
 */
function turnPage(url) {
    $("#main-page").attr("src", binfo.util.net.getURL() + url);
}