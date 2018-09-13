var dis= document.getElementById("textInput"),
    leftInput = document.getElementById("leftInput"),
    rightInput = document.getElementById("rightInput"),
    leftOutput = document.getElementById("leftOutput"),
    rightOutput = document.getElementById("rightOutput"),
    resert = document.getElementById("resert");

var ul = document.getElementById("query");
var ulVisual = document.getElementById("visualDisplay");
var sort = document.getElementById("sort");

var val = "";
//设置左侧输入按钮逻辑行为；
leftInput.onclick = function() {
    if(ul.childNodes.length >= 12){
        alert("您的操作将会导致溢出！请停止输入");
        return;
    }
    if(dis.value >= 10&&dis.value <= 100){
        var li = document.createElement("li");
        displayDigital(li);
        ul.insertBefore(li,ul.firstChild);
        var visLi = document.createElement("li");
        displayVisual(visLi);
        ulVisual.insertBefore(visLi,ulVisual.firstChild);
        dis.value = "";
    }else{
        alert("您的输入包含非法字符，请重新输入");
    }
}

//设置右侧输入按钮逻辑行为；
rightInput.onclick = function() {
    if(ul.childNodes.length >= 12){
        alert("您的操作将会导致溢出！请停止输入");
        return;
    }
    if(dis.value >= 10&&dis.value <= 100){
        var li = document.createElement("li");
        displayDigital(li);
        ul.appendChild(li);
        var visLi = document.createElement("li");
        displayVisual(visLi);
        ulVisual.appendChild(visLi,ulVisual.firstChild);
        dis.value = "";
    }else{
        alert("您的输入包含非法字符，请重新输入");
    }
}

//设置左侧输出按钮逻辑行为；
leftOutput.onclick = function() {
    ulVisual.removeChild(ulVisual.firstChild);
    ul.removeChild(ul.firstChild);
}

//设置右侧输出按钮逻辑行为；
rightOutput.onclick = function() {
    ulVisual.removeChild(ulVisual.lastChild);
    ul.removeChild(ul.lastChild);  
}

//设置重置按钮功能
resert.onclick = function() {
    while(ul.childNodes.length||ulVisual.childNodes.length){
        ul.removeChild(ul.firstChild);
        ulVisual.removeChild(ulVisual.firstChild);
    }
}

//添加排序按钮的逻辑
// 如果排序后又添加了怎么办
//再添加了之后能否不用在遍历所有值
sort.onclick = function () {
    var sortLi = ul.getElementsByTagName("li");
    var sortVisualLi = ulVisual.getElementsByTagName("li"),
        temp;
    if(sortLi.length == sortVisualLi.length){
        for(var i = 0;i < sortLi.length; ++i){
            for(var j = i+1; j < sortLi.length; ++j){
                //注意这里是字符串，要转化成数字进行比较，用parseInt方法；
                if(parseInt(sortLi[i].firstChild.nodeValue) > parseInt(sortLi[j].firstChild.nodeValue)){
                    swapli(sortLi[i],sortLi[j]);
                    swapli(sortVisualLi[i],sortVisualLi[j]);            
                }
            }
        }
    }else{
        alert("排序出问题啦");
    }
}

//数字显示
function displayDigital(li) {
    li.className = "query-style";
    li.appendChild(document.createTextNode(dis.value));
}

//可视化显示
function displayVisual(visLi) {
    visLi.className = "visual-query";
    visLi.style.height = (dis.value*2)+"px";
    visLi.appendChild(document.createTextNode(dis.value));
}

//交换列表的节点元素
//节点元素不能直接通过一个中间量来交换
function swapli(firstLi, secondLi) {
    var parent = firstLi.parentNode;
    var firstLiClone = firstLi.cloneNode(true);
    var secondLiClone = secondLi.cloneNode(true);
    parent.replaceChild(secondLiClone,firstLi);
    parent.replaceChild(firstLiClone,secondLi);
}

