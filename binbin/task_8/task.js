var preBtn = document.getElementById("preOrder"),
    inBtn = document.getElementById("inOrder"),
    postBtn = document.getElementById("postOrder");
var root = document.getElementById("root");
var input = document.getElementById("inputBox"),
    searchBtn = document.getElementById("searchBtn");

var timer = 0;
var timerSearch = 0;
// 控制显示效果
function showNode(node) {
    node.style.backgroundColor = "#ffffff";
    setTimeout(function() {
        node.style.backgroundColor = "#4caf50";
    }, timer += 500);

    setTimeout(function() {
        node.style.backgroundColor = "#ffffff";
    }, timer += 500);
}
//搜索节点过程显示效果
function showSearchNode(node) {
    node.style.backgroundColor = "#ffffff"
    setTimeout(function() {
        node.style.backgroundColor = "#ff524a";
    }, timerSearch += 500);
    
    setTimeout(function() {
        node.style.backgroundColor = "#ffffff";
    }, timerSearch += 500);
}

//搜索节点最终显示效果
function searchNodeResult(node) {
    setTimeout(function() {
        node.style.backgroundColor = "#ff524a";
    }, timerSearch += 500);
}

//前序遍历
function preOrder(root) {
    if(root){
        showNode(root);
        for(var i = 0; i < root.children.length; i++){
            preOrder(root.children[i]);
        }
    }
}
//中序遍历
function inOrder(root) {
    if(root){
        inOrder(root.children[0]);
        inOrder(root.children[1]);
        showNode(root);
        inOrder(root.children[2]);
        inOrder(root.children[3]);
    }
}
//后序遍历
function postOrder(root) {
    if(root){
       for(var i = 0; i < root.children.length; ++i){
            postOrder(root.children[i]);
        }
        showNode(root);
    }
}
//按钮功能
preBtn.addEventListener("click",function () {
    preOrder(root);
    timer = 0;
}, false);

inBtn.addEventListener("click", function () {
    inOrder(root);
    timer = 0;
}, false);

postBtn.addEventListener("click", function () {
    postOrder(root);
    timer = 0;
}, false);

searchBtn.addEventListener("click", function () {
    var value = input.value;
    searchIndex(root, value);
    timerSearch = 0;
}, false);

//查找结点,采用层序遍历
function searchIndex(root, value) {
    var temp = new Array();
    temp.push(root);
    while (temp.length > 0) {
        var item = temp.shift();
        if(item.firstChild.nodeValue.toLowerCase().match(value.toLowerCase())){
            searchNodeResult(item);
            break;
        }else{
            showSearchNode(item);
            for(var i = 0; i < item.children.length; ++i){
                temp.push(item.children[i]);   
            }
        }
    }
    if(temp.length == 0)
        alert("未找到");
}


