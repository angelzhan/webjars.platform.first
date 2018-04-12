/** @namespace binfo */
var binfo = {};

/** @namespace binfo.util */
binfo.util = {};
/** @namespace binfo.util.StringUtil */
binfo.util.StringUtil = {};

/**
 * 字符串是否有值
 * @function isNotEmpty
 * @memberof binfo.util.StringUtil
 * @static
 * @param {string} str 待验证的字符串
 * @returns {boolean} true：有值
 */
binfo.util.StringUtil.isNotEmpty = function (str) {
    return undefined !== str && null != str && "" !== str;
};

/** @namespace binfo.util.net */
binfo.util.net = {};
/**
 * 获取当前项目路径
 * @function getURL
 * @memberof binfo.util.net
 * @static
 * @returns {string} 如：http://www.abc.com/platform
 */
binfo.util.net.getURL = function () {
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： cis/website/meun.htm
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080
    var localhostPath = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var rootPath = localhostPath + projectName;
    return rootPath;
};
/** @namespace binfo.util.URL */
binfo.util.URL = {};
/**
 * 通过输入的参数名称获取URL的参数
 * @function getQueryString
 * @memberof binfo.util.URL
 * @static
 * @param {String} name 参数名称
 * @returns {string} 返回参数值，如果没有则返回null
 */
binfo.util.URL.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
};
/** @namespace binfo.net */
binfo.net = {};
/**
 * 异步ajax请求
 * @function asyncAjaxData
 * @memberof binfo.net
 * @static
 * @param {String} url 请求地址
 * @param {json} data1 请求的json数据
 * @param {function}success 成功后回调函数
 */
binfo.net.asyncAjaxData = function (method, url, data1, success) {
    binfo.net.rest.ajaxJson(method, url, data1, function (data) {
        if ("function" === typeof (success)) {
            success(data);
        }
    }, function (error) {
        if (error.statusText) {
            if ("parsererror" === error.statusText) {
                alert("数据转换出错");
            } else {
                alert(error.statusText);
            }
            return;
        }
        if (error.status && error.status !== 200) {
            alert("访问出错；错误码：" + error.status + "内容：" + error.responseText);
            return;
        }
        alert(error);
    });
};
/**
 * 同步ajax请求
 * @function asyncAjaxData
 * @memberof binfo.net
 * @static
 * @param {string} url 请求的url
 * @param {json} data1 请求的json数据
 * @returns {*}服务器返回的数据
 */
binfo.net.ajaxData = function (method, url, data1) {
    var res = null;
    var messageid = null;
    if ('undefined' !== typeof mini) {
        messageid = mini.loading("处理中请等待", "Loading");
    }
    binfo.net.rest.syncajaxJson(method, url, data1, function (data) {
        res = data;
    }, function (error) {
        if (error.statusText) {
            if ("parsererror" === error.statusText) {
                alert("数据转换出错");
            } else {
                alert(error.statusText);
            }
            if ('undefined' !== typeof mini) {
                mini.hideMessageBox(messageid);
            }
            return;
        }
        if (error.status && error.status !== 200) {
            alert("访问出错；错误码：" + error.status + "内容：" + error.responseText);
            if ('undefined' !== typeof mini) {
                mini.hideMessageBox(messageid);
            }
            return;
        }
        alert(error);
    });
    if ('undefined' !== typeof mini) {
        mini.hideMessageBox(messageid);
    }
    return res;
};
/** @namespace binfo.net.rest */
binfo.net.rest = {};
/**
 * post异步请求
 * @function jsonpost
 * @memberof binfo.net.rest
 * @static
 * @param {string} url 请求的地址
 * @param {json} data 请求的json数据
 * @param {function} successcall 成功回调方法
 * @param {function} errorcall 失败回调方法
 */
binfo.net.rest.ajaxJson = function (method, url, data, successcall, errorcall) {
    this.invoke(url, method, 'json', JSON.stringify(data), true, successcall, errorcall);
};

/**
 * post同步请求
 * @function syncjsonpost
 * @memberof binfo.net.rest
 * @static
 * @param {string} url 请求的地址
 * @param {json} data 请求的json数据
 * @param {function} successcall 成功回调方法
 * @param {function} errorcall 失败回调方法
 */
binfo.net.rest.syncajaxJson = function (method, url, data, successcall, errorcall) {
    this.invoke(url, method, 'json', JSON.stringify(data), false, successcall, errorcall);
};
/**
 * 通用请求方法
 * @function invoke
 * @memberof binfo.net.rest
 * @static
 * @param {string} url 请求的地址
 * @param {string} method 请求类型 如 post get
 * @param {string} datatype 数据类型 参看jquery.ajax的dataType
 * @param {string} data 请求的数据
 * @param {bool} async 是否异步
 * @param {function} successcall 成功回调方法
 * @param {function} errorcall 失败回调方法
 */
binfo.net.rest.invoke = function (url, method, datatype, data, async, successcall, errorcall) {
    jQuery.ajax({
        "type": method,//'POST',
        "contentType": "application/" + datatype,
        "url": binfo.util.net.getURL() + url,
        "data": data,
        "async": async,
        "success": successcall,
        "error": errorcall
    });

};

/****************miniUI***********/

function CloseWindow(action) {
    if (window.CloseOwnerWindow) return window.CloseOwnerWindow(action);
    else window.close();
}



