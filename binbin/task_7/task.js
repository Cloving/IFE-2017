var preBtn = document.getElementById("preOrder"),
    inBtn = document.getElementById("inOrder"),
    postBtn = document.getElementById("postOrder");
var root = document.getElementById("root");

var timer = 0;
//console.log(root.children[0].nodeName);
//root.children[0].style.backgroundColor = "#ff524a"

function showNode(node) {
    node.style.backgroundColor = "#ffffff";
    setTimeout(function() {
        node.style.backgroundColor = "#ff524a";
    }, timer += 500);

    setTimeout(function() {
        node.style.backgroundColor = "#ffffff";
    }, timer += 500);
}


function preOrder(root) {
    if(root){
        showNode(root);
        preOrder(root.children[0]);
        preOrder(root.children[1]);
    }
}

function inOrder(root) {
    if(root){
        inOrder(root.children[0]);
        showNode(root);
        inOrder(root.children[1]);
    }
}

function postOrder(root) {
    if(root){
        postOrder(root.children[0]);
        postOrder(root.children[1]);
        showNode(root);
    }
}

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
},false);





