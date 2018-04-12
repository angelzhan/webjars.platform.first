var grid;
$(function () {
    mini.parse();
    grid = mini.get("dataGrid");
    grid.setUrl(binfo.util.net.getURL()+"/user/getUserInfo");
    grid.load();
    grid.on("beforeload", function (e) {
        if (grid.getChanges().length > 0) {
            if (confirm("有增删改的数据未保存，是否取消本次操作？")) {
                e.cancel = true;
            }
        }
    });
});

function addUser() {
    var newRow = {name: "New Row"};
    grid.addRow(newRow, 0);
    grid.beginEditCell(newRow, "LoginName");
}

function saveUser() {
    var data = grid.getChanges();
    binfo.net.asyncAjaxData("post", "/user/add", {
        data: data
    }, function (data) {
        grid.reload();
    });
}

function reLoadUser() {
    grid.reload();
}

function assignRole() {
    var data = grid.getSelected();
    mini.open({
        url:binfo.util.net.getURL()+"/system/user/role_bind.html?type=user&id="+data.userID,
        width:400,
        height:600
    });
}