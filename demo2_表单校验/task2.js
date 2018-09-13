/* 通过点击查询按钮来获取验证表单的输入是否合法 */
/* 0. 声明全局变量及初始化函数 */
var inputBox = document.getElementsByTagName("input"),
    btn = document.getElementById("button"),
    tips = document.getElementsByTagName('p');
var inputArray = Array.prototype.slice.call(inputBox),      
    tipsArray = Array.prototype.slice.call(tips);

function initialize(node) {
    removeClass(node, "disRed");
    removeClass(node, "disGreen");
    removeClass(node, "disBoxRed");
    removeClass(node, "disBoxGreen");
}


/* 一、对输入框获得焦点、失去焦点和点击提交按钮等操作添加相应的事件 */
/* 1-1. 文本框获得焦点时发生的事件 */
function onfocusDisplay() {
    inputArray.forEach(function (currentValue, index, array) {
        currentValue.addEventListener("focus",function (e) {
            e.stopPropagation();
            e.preventDefault();
            onfocusTips(currentValue, index);
        },false);
    }, this)
}

/* 1-2. 文本框失去焦点时发生的事件 */
function onblurDisplay() {
    inputArray.forEach(function (currentValue, index, array) {
        currentValue.addEventListener("blur", function (e) {
            e.stopPropagation();
            e.preventDefault();
            switch (index) {
                case 0:
                    checkName(currentValue, index);
                    break;
                case 1:
                    checkPassword(currentValue, index);
                    break;
                case 2:
                    verifyPassword(currentValue, index);
                    break;
                case 3:
                    checkEmail(currentValue, index);
                    break;
                case 4:
                    checkMobileNumber(currentValue, index);
                    break;
                default:
                    break;
            }
        }, false);
    }, this);
}

/* 1-3. 点击按钮时发生的事件 */
function clickBtn() {
    btn.addEventListener("click", function (e) {
        checkName(inputArray[0], 0);
        checkPassword(inputArray[1], 1);            
        verifyPassword(inputArray[2], 2);
        checkEmail(inputArray[3], 3);
        checkMobileNumber(inputArray[4], 4);
        var flag = 0;
        for(var i = 0; i < inputArray.length; ++i){
            if(inputArray[i].className.indexOf("disBoxGreen") !== -1){
                flag++;
            }
        }
        flag == 5 ? alert("提交成功，感谢您的参与！") : alert("提交失败！");
    }, false);
}


/* 二、检测各项的输入是否符合规则 */
/* 2-1. 检测名称的输入是否符合规则 */
function checkName(element, index) {
    var str = element.value;
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
    if(res >=4 && res <= 16) {
        inputMatch(element, index); 
    }else{
        inputNotMatch(element, index);
    }
}

/* 2-2. 检测密码的输入是否符合规则 */
function checkPassword(element, index) {
    initialize(tipsArray[index]);
    initialize(element);
    var str = element.value;
    var res = 0, len = str.length;
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
    if(pattern.test(str)){
        inputMatch(element, index);
    }else{
        inputNotMatch(element, index);
    }
}

/* 2-3. 验证密码前后输入是否一致 */
function verifyPassword(element, index) {
    if(tipsArray[index-1].className.indexOf("disGreen") !== -1){
        if(inputArray[index-1].value == element.value){
            inputMatch(element, index);
        }else{
            inputNotMatch(element, index); 
        }
    }else{
        inputNotMatch(element, index) 
    }
}

/* 2-4. 检测邮箱的输入是否符合规则 */
function checkEmail(element, index) {
    initialize(tipsArray[index]);
    initialize(element);
    var str = element.value;
    var res = 0, len = str.length;
    var pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;    
    if(pattern.test(str)){
        inputMatch(element, index);
    }else{
        inputNotMatch(element, index);
    }
}

/* 2-5. 检测手机号的输入是否符合规则 */
function checkMobileNumber(element, index) {
    initialize(tipsArray[index]);
    initialize(element);
    var str = element.value;
    var res = 0, len = str.length;
    var pattern = /^1[34578][0-9]{9}$/;    
    if(pattern.test(str)){
        inputMatch(element, index);
    }else{
        inputNotMatch(element, index);
    }
}


/* 三、获得焦点时显示的提示信息 */
function onfocusTips(element, index) {
    initialize(tipsArray[index]);
    initialize(element);
    var textNode;
     try {
        switch (index) {
            case 0:
                textNode = document.createTextNode("必填，长度为4-16个字符");
                break;
            case 1:
                textNode = document.createTextNode("密码长度为8-16个字符，可输入大小写字母和数字");
                break;
            case 2:
                textNode = document.createTextNode("请再次输入相同的密码");
                break;
            case 3:
                textNode = document.createTextNode("请输入电子邮箱");
                break;
            case 4:
                textNode = document.createTextNode("请输入中国大陆手机号");
                break;
            default:
                throw "error index";
                break;
        }
    } catch (error) {
        alert(error);
    }
    if(tipsArray[index].firstChild){
        tipsArray[index].replaceChild(textNode, tipsArray[index].firstChild);   
    }else{
        tipsArray[index].appendChild(textNode);  
    }
}



/* 四、 失去焦点时显示相应的检测结果 */
/* 4-1. 输入内容符合预期 */
function inputMatch(inputElement, index) {
    initialize(tipsArray[index]);
    initialize(inputElement);
    var textNode;
    try {
        switch (index) {
            case 0:
                textNode = document.createTextNode("名称格式正确");
                break;
            case 1:
                textNode = document.createTextNode("密码可用");
                break;
            case 2:
                textNode = document.createTextNode("密码输入一致");
                break;
            case 3:
                textNode = document.createTextNode("邮箱格式正确");
                break;
            case 4:
                textNode = document.createTextNode("手机号格式正确");
                break;
            default:
                throw "error index";
                break;
        }
    } catch (error) {
        alert(error);
    }
    if(tipsArray[index].firstChild){
        tipsArray[index].replaceChild(textNode, tipsArray[index].firstChild);   
    }else{
        tipsArray[index].appendChild(textNode);  
    } 
    addClass(tipsArray[index], "disGreen");
    addClass(inputElement,"disBoxGreen");  
}

/* 4-2. 输入内容不符合预期 */
function inputNotMatch(inputElement, index) {
    initialize(tipsArray[index]);
    initialize(inputElement);
    var textNode;
    try {
        switch (index) {
            case 0:
                textNode = document.createTextNode("名称格式长度不符合要求");
                break;
            case 1:
                textNode = document.createTextNode("密码长度不符合要求或输入不合法");
                break;
            case 2:
                textNode = document.createTextNode("密码前后输入不一致");
                break;
            case 3:
                textNode = document.createTextNode("邮箱格式不正确");
                break;
            case 4:
                textNode = document.createTextNode("手机号格式不正确");
                break;
            default:
                throw "error index";
                break;
        }
    } catch (error) {
        alert(error);
    }
    if(tipsArray[index].firstChild){
        tipsArray[index].replaceChild(textNode, tipsArray[index].firstChild);   
    }else{
        tipsArray[index].appendChild(textNode);  
    } 
    addClass(tipsArray[index], "disRed");
    addClass(inputElement,"disBoxRed");  
}


/* 五、添加删除类操作 */
/* 5-1.  在对应标签中添加指定类 */
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

/* 5-2. 将指定类从相应标签中删除 */
function removeClass(element, value) {
    if(element.className.indexOf(value) !== -1){
        var tempValue = element.className;
        element.className = tempValue.replace(value, '');
    }
}

/* 六. 设置加载页面后执行的函数 */
window.onload = function () {
    onfocusDisplay();   //文本框聚焦事件
    onblurDisplay();    //文本框失去焦点事件
    clickBtn()          //点击按钮事件
}   
