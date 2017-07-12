var dis= document.getElementById("textInput"),
    leftInput = document.getElementById("leftInput"),
    rightInput = document.getElementById("rightInput"),
    leftOutput = document.getElementById("leftOutput"),
    rightOutput = document.getElementById("rightOutput"),
    resert = document.getElementById("resert");

var ul = document.getElementById("query"),
    li = ul.getElementsByTagName("li");
var search = document.getElementById("searchButton");
var input = document.getElementById("searchBox");

var val = "";
//设置左侧输入按钮逻辑行为；
leftInput.onclick = function() {
    if(ul.childNodes.length >= 12){
        alert("您的操作将会导致溢出！请停止输入");
        return;
    }
    var li = document.createElement("li");
    displayDigital(li);
    ul.insertBefore(li,ul.firstChild);
    dis.value = "";
}

//设置右侧输入按钮逻辑行为；
rightInput.onclick = function() {
    if(ul.childNodes.length >= 12){
        alert("您的操作将会导致溢出！请停止输入");
        return;
    }
    var li = document.createElement("li");
    displayDigital(li);
    ul.appendChild(li);
    dis.value = "";
}

//设置左侧输出按钮逻辑行为；
leftOutput.onclick = function() {
    ul.removeChild(ul.firstChild);
}

//设置右侧输出按钮逻辑行为；
rightOutput.onclick = function() {
    ul.removeChild(ul.lastChild);  
}

//设置重置按钮功能
resert.onclick = function() {
    while(ul.childNodes.length){
        ul.removeChild(ul.firstChild);
    }
}

search.onclick = function() {
    var temp = input.value;
    for(var i = 0; i < li.length;i++){
        if(li[i].firstChild.nodeValue.match(temp))
            li[i].style.color = "black";
    }
}

//数字显示
function displayDigital(li) {
    li.className = "query-style";
    li.appendChild(document.createTextNode(dis.value));
}




