var dis= document.getElementById("textDisplay"),
    leftInput = document.getElementById("leftInput"),
    rightInput = document.getElementById("rightInput"),
    leftOutput = document.getElementById("leftOutput"),
    rightOutput = document.getElementById("rightOutput"),
    resert = document.getElementById("resert");

var ul = document.getElementById("query");
var items = ul.getElementsByTagName("li");
var listArray = [];

for(var i = 0; i < items.length; i++){
    listArray.push(items[i].firstChild.nodeValue);
    //temp.push(li[i].innerHTML);
}

var val = "";
//设置左侧输入按钮逻辑行为；
leftInput.onclick = function() {
    //setAttribute与.value的区别；
    if(listArray.length){
        var tempValue = listArray.shift();
        val = tempValue +" "+val;
        dis.value = val;
    }else{
        dis.value = "到头了，老板";
    }
}

//设置右侧输入按钮逻辑行为；
rightInput.onclick = function() {
    if(listArray.length){
        var tempValue = listArray.shift();
        val = val + tempValue+" ";
        dis.value = val;
    }else{
        dis.value = "别点了，没了";
    }
}

//设置左侧输出按钮逻辑行为；
leftOutput.onclick = function() {
    var spaceIndex = dis.value.indexOf(" ");
    //alert(spaceIndex);
    if(spaceIndex != -1){
        dis.value = dis.value.slice(spaceIndex+1);
        val = dis.value;
    }else{
        dis.value = "我们破产了，老板"
    }
}

//设置右侧输出按钮逻辑行为；
rightOutput.onclick = function() {
    var spaceIndex = dis.value.lastIndexOf(" ",dis.value.length-2);
    //alert(spaceIndex);
    if(spaceIndex != -1){
        dis.value = dis.value.slice(0,spaceIndex);
        val = dis.value+" ";
    }else{
        dis.value = "我们破产了，老板"
    }
}

//设置重置按钮功能
resert.onclick = function() {
    dis.value = "";
    listArray = [];
    val = "";
    for(var i = 0; i < items.length; i++){
        //temp.push(li[i].innerHTML);
        listArray.push(items[i].firstChild.nodeValue);
    }
}