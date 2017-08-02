var preBtn = document.getElementById("preOrder"),
    inBtn = document.getElementById("inOrder"),
    postBtn = document.getElementById("postOrder");
    root = document.getElementById("root"),
    leftTree = document.getElementById("leftTree"),
    rightTree = document.getElementById("rightTree"),
    ltlChild = document.getElementById("ltlChild"),
    ltrChild = document.getElementById("ltrChild"),
    rtlChild = document.getElementById("rtlChild"),
    rtrChild = document.getElementById("rtrChild");

root.setAttribute("left", leftTree);
console.log(root.left);