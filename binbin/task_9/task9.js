/* 0. 初始化各种全局变量、设置初始化函数 */
var preBtn = document.getElementById("preOrder"),
    inBtn = document.getElementById("inOrder"),
    postBtn = document.getElementById("postOrder");
var root = document.getElementById("root");
var input = document.getElementById("inputBox"),
    searchBtn = document.getElementById("searchBtn");
var iteratorObjArray = [], 
    tempArray;
var delButton = document.getElementById("delButton"),
    addInput = document.getElementById("addBox"),
    addButton = document.getElementById("addButton");    
var timer = 0;
var timerSearch = 0;



//初始化函数
function initialize() {
    clearClass("showSelected");
    iteratorObjArray = [];
}

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

/* 1.设置前序、中序、后序各种遍历按钮功能 */
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

/* 2. 设置对应按钮监听事件 */
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

/* 3. 设置前序、后序遍历功能 */
/* 添加前序遍历功能，并存于一个数组中，该数组的功能用于选择确定的元素 */
function preOrderArray(node) {
    if(node){
        iteratorObjArray.push(node);
        var num = node.children;
        for(var i = 0; i < num.length; ++i){
            preOrderArray(num[i]);
        }
    }
}
/* 添加后序遍历功能，并存于一个数组中，该数组的功能用于选择确定的元素 */
function preOrderArray(node) {
    if(node){
        var num = node.children;
        for(var i = 0; i < num.length; ++i){
            preOrderArray(num[i]);
        }
        iteratorObjArray.push(node);
    }
}

/* 4. 设置标签选定功能 */
function slectTag() {
    preOrderArray(root);
    tempArray = Array.prototype.slice.call(iteratorObjArray);
    tempArray.forEach(function(e) {
         e.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            initialize();
            addClass(this, 'showSelected');
        }, false); 
    });
}


/* 5. 设置删除功能，用于删除选定的节点和他的子节点 */
function delNode() {
    delButton.onclick = function (e) {
        e.preventDefault();
        // e.stopPropagation(); 
        tempArray.forEach(function (currentValue) {
            if(currentValue.className.indexOf("showSelected") !== -1){
                currentValue.remove(this);
            }
        }, this);
        slectTag();
    }
}

/* 6. 设置添加功能，用于在选定的标签中添加子元素，
子元素的节点值来自于文本框 */
function addNodes() {
    addButton.onclick = function (e) {
        e.preventDefault();
        var addInputValue = addInput.value; 
        var tempNode = document.createElement("section");
        tempNode.appendChild(document.createTextNode(addInputValue));
        addClass(tempNode, "treeType");
        tempArray.forEach(function (currentValue) {
            if(currentValue.className.indexOf("showSelected") !== -1){
                currentValue.appendChild(tempNode);
            }
        }, this);
        slectTag();
    }
}


/* 7. 增加删除类 */
function addClass(element, value) {
    if(!element) return false;
    if(!element.className){
        element.className = value;
    }else{
        var tempClass = element.className;
        tempClass += ' ';
        tempClass += value;
        element.className = tempClass;
    }
}

function removeClass(element, value) {
    if(element.className.indexOf(value) !== -1){
        var tempClass = element.className;
        tempClass.replace(value, '');
        element.className = tempClass;
    }
}
//初始化函数，用于清除选定添加的类
function clearClass(val) {
    tempArray.forEach(function (currentValue) {
        removeClass(currentValue, val);
    });
}


//查找结点,采用层序遍历
function searchIndex(root, value) {
    var temp = new Array();
    temp.push(root);
    while (temp.length > 0) {
        var item = temp.shift();
        if(item.firstChild.nodeValue === value){
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


/* 页面载入后执行函数， 
设置函数中如果为按钮指定了事件，
则该函数需要在页面加载时执行，否则按钮功能不会生效*/
window.onload = function () {
    slectTag();
    delNode();
    addNodes();
}
