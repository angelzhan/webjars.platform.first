var unselectedList;
var selectedList;
var id = binfo.util.URL.getQueryString("id");
var type = binfo.util.URL.getQueryString("type");

$(function () {
    mini.parse();
    unselectedList = mini.get("unSelectList");
    selectedList = mini.get("selectedList");
    initData();
});

function initData() {
    unselectedList.setData(binfo.net.ajaxData("post", "/role/getUnselectedRole/" + type + "/" + id, {}).data);
    selectedList.setData(binfo.net.ajaxData("post", "/role/getSelectedRole/" + type + "/" + id, {}).data);
}

function add_() {
    var items = unselectedList.getSelecteds();
    unselectedList.removeItems(items);
    selectedList.addItems(items);
}

function addAll_() {
    var items = unselectedList.getData();
    unselectedList.removeItems(items);
    selectedList.addItems(items);
}

function remove_() {
    var items = selectedList.getSelecteds();
    selectedList.removeItems(items);
    unselectedList.addItems(items);
}

function removeAll_() {
    var items = selectedList.getData();
    selectedList.removeItems(items);
    unselectedList.addItems(items);
}

function save_() {
    var row = selectedList.getData();
    binfo.net.asyncAjaxData("post", "/role/bindRole/" + type + "/" + id, {
        data: row
    }, function (data) {
        if (data.status) {
            CloseWindow("ok");
        } else {
            alert(data.data);
        }
    })
}
