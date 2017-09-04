/* 0. 初始化各种全局变量、设置初始化函数 */
var preBtn = document.getElementById("preOrder"),       //获取前序遍历的按钮
    inBtn = document.getElementById("inOrder"),         //获取中序遍历的按钮
    postBtn = document.getElementById("postOrder");     //获取后序遍历的按钮
var root = document.getElementById("root");             //获取树的根节点
var input = document.getElementById("inputBox"),        //获取查找结点输入框的值
    searchBtn = document.getElementById("searchBtn");   //获取查找节点的搜索按钮
var iteratorObjArray = [],                              //声明一个数组，用于存储遍历后获得的有序section标签 
    tempArray;                                          //声明一个值，用于存储iteratorObjArray类转化为数组后的值
var delButton = document.getElementById("delButton"),   //获取删除按钮
    addInput = document.getElementById("addBox"),       //获取添加内容文本框
    addButton = document.getElementById("addButton");   //获取添加按钮
var timer = 0;                                          //声明一个值，用于存放前、中、后遍历间歇调用的时间
var timerSearch = 0;                                    //声明一个值，用于存放查找过程的间歇调用时间

/* 1. 设置初始化函数 */
function initialize() {
    clearClass("showSelected");
    iteratorObjArray = [];
}

/* 2. 设置前序、中序、后序遍历的动画显示效果 */
function showNode(node) {
    node.style.backgroundColor = "#ffffff";
    setTimeout(function() {
        node.style.backgroundColor = "#4caf50";
    }, timer += 500);

    setTimeout(function() {
        node.style.backgroundColor = "#ffffff";
    }, timer += 500);
}
/* 3-1. 设置搜索节点过程动画显示效果 */
function showSearchNode(node) {
    node.style.backgroundColor = "#ffffff"
    setTimeout(function() {
        node.style.backgroundColor = "#ff524a";
    }, timerSearch += 500);
    
    setTimeout(function() {
        node.style.backgroundColor = "#ffffff";
    }, timerSearch += 500);
}

/* 3-2. 搜索节点最终显示效果 */
function searchNodeResult(node) {
    setTimeout(function() {
        node.style.backgroundColor = "#ff524a";
    }, timerSearch += 500);
}

/* 4. 设置前序、中序、后序各种遍历函数 */
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

/* 5. 设置前中后及查找按钮的点击监听事件 */
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

/* 6. 设置查找结点调用函数,采用层序遍历 */
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

/* 7. 设置前序、后序遍历功能，用于选定节点及删除、添加节点后文档结构的更新 */
/* 添加前序遍历功能，并存于一个数组中，该数组的功能用于选择确定的元素 */
function preOrderArray(node) {
    if(node){
        iteratorObjArray.push(node);
        //子节点包括直接后代和后代的后代
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

/* 8. 设置标签选定功能 */
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


/* 9. 设置删除功能，用于删除选定的节点和他的子节点 */
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

/* 10. 设置添加节点功能，用于在选定的标签中添加子元素，子元素的节点值来自于输入文本框 */
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


/* 11. 增加删除类 */
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
        //replace() 方法返回一个由替换值替换一些或所有匹配的模式后的新字符串。
        element.className = tempClass.replace(value, ''); 
        console.log(element.className);
    }
}
function clearClass(val) {
    tempArray.forEach(function (currentValue) {
        removeClass(currentValue, val);
    }, this);
}

/* 页面加载后执行的函数， 
设置函数中如果为按钮指定了事件，
则该函数需要在页面加载时执行，否则按钮功能不会生效*/
window.onload = function () {
    slectTag();
    delNode();
    addNodes();
}
