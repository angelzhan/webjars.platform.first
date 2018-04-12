var dataGrid;
$(function () {
    /**
     * miniUI初始化,并获取表格对象
     */
    mini.parse();
    dataGrid = mini.get("dataGrid");
    searchData();
});

/**
 * 增加，采用miniUI的增加虚拟行的方式进行操作。
 */
function addData() {
    var newRow = {name: "New Row"};
    dataGrid.addRow(newRow, 0);
    dataGrid.beginEditCell(newRow, "newRow");
}

function deleteData() {
    var data = dataGrid.getSelected();
    if (data != null) {
        if (confirm("确定删除选中记录？")) {
            var result = binfo.net.ajaxData("post", "/dictionary/delete/" + data.id, {});
            if (!result.status) {
                alert(result.data);
            }
        }
        reloadData();
    } else {
        alert("请选择一条记录");
    }
}

function saveData() {
    /**
     * miniUI提供了一个方法可以直接获取表格中增加/修改的数据（行）
     */
    var data = dataGrid.getChanges();
    binfo.net.asyncAjaxData("post", "/dictionary/save", {
        data: data
    }, function (data) {
        reloadData();
    });
}

function reloadData() {
    dataGrid.reload();
}

function searchData() {
    dataGrid.setUrl(binfo.util.net.getURL() + "/dictionary/get");
    dataGrid.load();
}

