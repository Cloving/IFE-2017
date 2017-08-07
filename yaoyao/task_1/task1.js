/* 通过点击查询按钮来获取验证表单的输入是否合法 */
var inputBox = document.getElementById("inputBox"),
    btn = document.getElementById("button"),
    tips = document.getElementById('tips');

/* 0. 初始化函数 */
function initialize(node) {
    removeClass(node, "disRed");
    removeClass(node, "disGreen");
}

/* 1. 设置点击验证按钮功能 */
function check() {
    btn.addEventListener("click", function () {
        initialize(tips);
        var str = inputBox.value;
        var res = 0, len = str.length;
        for(var i = 0; i < str.length; ++i){
            var codeVal = str.charCodeAt(i);
            if(codeVal >= 0xD800 && codeVal <= 0xDBFF){
                res += 4;
                i++;
            }
            if(codeVal >= 0x00 && codeVal <= 0xff){
                res++;
            }else{
                res += 2;
            }
        }
        if(res < 4) inputTooLittle(tips);
        else if(res >=4 && res <= 16) inputMatch(tips); 
        else inputExcessive(tips);
    }, false);
}

/* 2. 输入内容符合预期 */
function inputMatch(node) {
    var textNode = document.createTextNode("名称格式正确");
    node.replaceChild(textNode, node.firstChild);  
    addClass(node, "disGreen");  
}

/* 3. 输入内容过少，小于4个字符 */
function inputTooLittle(node) {
    var textNode = document.createTextNode("输入内容小于4个字符");
    node.replaceChild(textNode, node.firstChild);
    addClass(node, "disRed");
}

/* 4. 输入内容过多，多于16个字符 */
function inputExcessive(node) {
    var textNode = document.createTextNode("输入内容大于16个字符");
    node.replaceChild(textNode, node.firstChild);    
    addClass(node, "disRed");
}

/* 5.  在对应标签中添加指定类 */
function addClass(element, value) {
    if(!element) return false;
    if(!element.className){
        element.className = value;
    }else{
        var tempValue = element.className;
        tempValue += ' ';
        tempValue += value;
        element.className = tempValue;
    }
}

/* 6. 将指定类从相应标签中删除 */
function removeClass(element, value) {
    if(element.className.indexOf(value) !== -1){
        var tempValue = element.className;
        element.className = tempValue.replace(value, '');
    }
}

/* 7. 设置加载页面后执行的函数 */
window.onload = function () {
    check();
}   