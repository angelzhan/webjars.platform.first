var grid
$(function () {
    mini.parse();
    grid = mini.get("dataGrid");
    grid.setUrl(binfo.util.net.getURL() + "/role/getRoleInfo");
    grid.load();
    grid.on("beforeload", function (e) {
        if (grid.getChanges().length > 0) {
            if (confirm("有增删改的数据未保存，是否取消本次操作？")) {
                e.cancel = true;
            }
        }
    });
});

function addRole() {
    var newRow = {name: "New Row"};
    grid.addRow(newRow, 0);
    grid.beginEditCell(newRow, "roleName");
}

function saveRole() {
    var data = grid.getChanges();
    binfo.net.asyncAjaxData("post", "/role/add", {
        data: data
    }, function (data) {
        grid.reload();
    });
}