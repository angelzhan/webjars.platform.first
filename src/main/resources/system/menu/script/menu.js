var tree;
$(function () {
    mini.parse();
    tree = mini.get('tree1');
    tree.setUrl(binfo.util.net.getURL() + "/menu/tree");
});

function onBeforeTreeLoad(e) {
    var node = e.node;      //当前节点
    var params = e.params;  //参数对象

    //可以传递自定义的属性
    params.parentID = node.menuID;
    params.level = node._level;
}

function onBeforeOpen(e) {
    var node = tree.getSelected();
    if (node._level === "0") {
        $('#menu-remove').hide();
        $('#menu-role').hide();
        $('#menu-add').show();
    } else if (node._level === "1") {
        $('#menu-remove').show();
        $('#menu-role').show();
        $('#menu-add').show();
    } else if (node._level === "2") {
        $('#menu-remove').show();
        $('#menu-role').show();
        $('#menu-add').hide();
    }
}

function onNodeclick(e) {
    var baseUrl = binfo.util.net.getURL() + "/system/menu/menu_edit.html";
    var node = e.node;
    // 根节点
    if (node.isLeaf) {
        $('#menu-iframe').attr("src", baseUrl + "?type=update&id=" + node.menuID + "&pid=" + node.parentID + "&isLeaf=true");
    } else {
        $('#menu-iframe').attr("src", baseUrl + "?type=update&id=" + node.menuID + "&pid=" + node.parentID);
    }
}

/**
 * 增加菜单
 */
function addMenu() {
    var baseUrl = binfo.util.net.getURL() + "/system/menu/menu_edit.html";
    var node = tree.getSelected();
    $('#menu-iframe').attr("src", baseUrl + "?type=new" + "&pid=" + node.menuID + "&level=" + node._level);
}

/**
 * 移除菜单
 */
function removeMenu() {
    var node = tree.getSelected();
    binfo.net.asyncAjaxData("post", "/menu/remove/" + node.menuID, {}, function (data) {
        if (data.status) {
            tree.removeNode(node);
            reloadParent(node);
        }
    });
}

/**
 * 绑定角色
 */
function bindGroup() {
    var node = tree.getSelected();
    mini.open({
        url: binfo.util.net.getURL() + "/system/user/role_bind.html?type=menu&id=" + node.menuID,
        width: 500,
        height: 600
    });
}

function reloadParent(node) {
    var pNode = tree.getParentNode(node);
    tree.loadNode(pNode);
}

function reloadParentNodeBySelected() {
    var node = tree.getSelected();
    reloadParent(node);
}

function reloadSelected() {
    var node = tree.getSelected();
    tree.loadNode(node);
}