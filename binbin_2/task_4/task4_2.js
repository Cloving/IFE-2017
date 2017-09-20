var dis= document.getElementById("textInput"),
    leftInput = document.getElementById("leftInput"),
    rightInput = document.getElementById("rightInput"),
    leftOutput = document.getElementById("leftOutput"),
    rightOutput = document.getElementById("rightOutput"),
    resert = document.getElementById("resert");

var ul = document.getElementById("query");

var val = "";
//设置左侧输入按钮逻辑行为；
leftInput.onclick = function() {
    if(dis.value){
        var li = document.createElement("li");
        li.className = "query-style";
        li.appendChild(document.createTextNode(dis.value));
        ul.insertBefore(li,ul.firstChild);
        dis.value = "";
    }
}

//设置右侧输入按钮逻辑行为；
rightInput.onclick = function() {
    if(dis.value){
        var li = document.createElement("li");
        li.className = "query-style";
        li.appendChild(document.createTextNode(dis.value));
        ul.appendChild(li);
        dis.value = "";
    }
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