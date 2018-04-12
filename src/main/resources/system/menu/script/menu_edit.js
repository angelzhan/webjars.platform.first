var form;

var type = binfo.util.URL.getQueryString("type");
var id = binfo.util.URL.getQueryString("id");
var pid = binfo.util.URL.getQueryString("pid");

var urlInput;

$(function () {
    mini.parse();
    init();
});

function init() {
    form = new mini.Form("menu-form");
    urlInput = mini.get('menu-url');
    if ("update" == type) {
        // if (!isLeaf) {
        //     urlInput.disable();
        // }
        getMenuInfo(id);
    }
}

function getMenuInfo(id) {
    binfo.net.asyncAjaxData("post","/menu/getMenuInfo", {
        menuID: id
    }, function (data) {
        if (data.status) {
            form = new mini.Form("menu-form");
            form.setData(data.data);
        }
    })
}

function save() {
    if ("update" == type) {
        updateMenuInfo();
    } else {
        saveMenu();
    }
}

function updateMenuInfo() {
    binfo.net.asyncAjaxData("post","/menu/updateNameAndUrl", form.getData(), function (data) {
        if (data.status) {
            alert("success!");
            window.parent.reloadParentNodeBySelected();
        }
    })
}

function saveMenu() {
    var info = form.getData();
    info.level = binfo.util.URL.getQueryString("level");
    info.parentID = pid;
    binfo.net.asyncAjaxData("post","/menu/add", info, function (data) {
        if (data.status) {
            alert("success!");
            window.parent.reloadSelected();
        }
    })
}