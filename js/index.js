var map = document.getElementById("map");
var over = document.getElementById("over");
var aaa = document.getElementById("aaa");
var fast = document.getElementById("fast");
var midd = document.getElementById("midd");
var slow = document.getElementById("slow");
var pauseBtn = document.getElementById("pauseBtn");
var startBtn = document.getElementById("startBtn");
aaa.innerText = 0;
var a = 0;
var b = 0;
var bodyNodes = [];
var nodes = [];

function restart() {
    startBtn.style.display = "block";
    over.style.display = "none";
}

function die() {
    over.style.display = "block";
}

function kaishi() {
    startBtn.style.display = "none";
}

function zanting() {
    pauseBtn.style.display = "block";
    clearInterval(t);
}

function back() {
    pauseBtn.style.display = "none";
    if (b == 1) {
        t = setInterval(move,100);
    }else if (b == 2) {
        t = setInterval(move,300);
    }else {
        t = setInterval(move,500);
    }

}

function createDiv(color) {
    var hed = document.createElement("div");
    hed.className = "hed";
    hed.style.backgroundColor = color;
    hed.style.left = parseInt(Math.random()*20)*30 + "px";
    hed.style.top = parseInt(Math.random()*20)*30 + "px";
    map.appendChild(hed);
    return hed;
}
function createHead() {
    var hedd = document.createElement("div");
    hedd.className = "hedd";
    hedd.style.left = parseInt(Math.random()*20)*30 + "px";
    hedd.style.top = parseInt(Math.random()*20)*30 + "px";
    map.appendChild(hedd);
    return hedd;
}

var headNode = createHead();
nodes.push(headNode);
headNode.value = "右";
var foodNode = createDiv("green");

function move() {
    //身体移动
    if (bodyNodes.length > 0) {
        for (var i = bodyNodes.length-1; i >= 0; i--) {
            switch (bodyNodes[i].value) {
                case "上":bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) - 30 +"px" ;
                    break;
                case "下":bodyNodes[i].style.top = parseInt(bodyNodes[i].style.top) + 30 +"px" ;
                    break;
                case "左":bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) - 30 +"px";
                    break;
                case "右":bodyNodes[i].style.left = parseInt(bodyNodes[i].style.left) + 30 +"px";
                    break;
            }
            if (i == 0) {
                bodyNodes[0].value = headNode.value
            }else {
                bodyNodes[i].value = bodyNodes[i-1].value
            }
        }
    }

    switch (headNode.value) {
        case "上":headNode.style.top = parseInt(headNode.style.top) - 30 +"px" ;
        break;
        case "下":headNode.style.top = parseInt(headNode.style.top) + 30 +"px" ;
        break;
        case "左":headNode.style.left = parseInt(headNode.style.left) - 30 +"px";
        break;
        case "右":headNode.style.left = parseInt(headNode.style.left) + 30 +"px";
        break;
    }

    //死了
    if (parseInt(headNode.style.left) < 0 || parseInt(headNode.style.left) > 570 || parseInt(headNode.style.top) < 0 || parseInt(headNode.style.top) > 570) {
        clearInterval(t);
        die();
    }

    //死了
    if (bodyNodes.length > 0) {
        for (var i = 0; i < bodyNodes.length; i++) {
            if (headNode.style.left == bodyNodes[i].style.left && headNode.style.top == bodyNodes[i].style.top) {
                clearInterval(t);
                die();
            }
        }
    }


    //碰撞检测（两个元素重合了）
    if (headNode.style.left == foodNode.style.left && headNode.style.top == foodNode.style.top) {
        //新的身体
        //1.找到最后一块
        a = a + 1;
        aaa.innerText = a;
        var bodyNode = createDiv("yellow");
        var lastNode
        if (bodyNodes.length > 0) {
            lastNode = bodyNodes[bodyNodes.length-1];
        }else {
            lastNode = headNode;
        }
        switch (lastNode.value) {
            case "上":
                bodyNode.style.top = parseInt(lastNode.style.top) + 30 +"px" ;
                bodyNode.style.left = lastNode.style.left;
            break;
            case "下":
                bodyNode.style.top = parseInt(lastNode.style.top) - 30 +"px" ;
                bodyNode.style.left = lastNode.style.left;
            break;
            case "左":
                bodyNode.style.left = parseInt(lastNode.style.left) + 30 +"px";
                bodyNode.style.top = lastNode.style.top;
            break;
            case "右":
                bodyNode.style.left = parseInt(lastNode.style.left) - 30 +"px";
                bodyNode.style.top = lastNode.style.top;
            break;
        }
        bodyNode.value = lastNode.value;
        bodyNodes.push(bodyNode);
        nodes.push(bodyNode);


        // 食物位置更新
        var px = parseInt(Math.random()*20)*30;
        var py = parseInt(Math.random()*20)*30;
        for (var i = 0; i < nodes.length; i++) {
            if (parseInt(nodes[i].style.left) == px && parseInt(nodes[i].style.top) == py) {
                px = parseInt(Math.random()*20)*30;
                py = parseInt(Math.random()*20)*30;
                i = -1;
            }
        }
        foodNode.style.left = px + "px";
        foodNode.style.top = py + "px";
    }

}
fast.onclick = function() {
    t = setInterval(move,100);
    b = 1;
    midd.disabled="disabled";
    slow.disabled="disabled";
}
midd.onclick = function() {
    t = setInterval(move,300);
    b = 2;
    fast.disabled="disabled";
    slow.disabled="disabled";
}
slow.onclick = function() {
    t = setInterval(move,500);
    b = 3;
    midd.disabled="disabled";
    fast.disabled="disabled";
}


document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 38: if (headNode.value != "下" || nodes.length == 1) {
            headNode.value = "上"
        };
        break;
        case 40: if (headNode.value != "上" || nodes.length == 1) {
            headNode.value = "下"
        };
        break;
        case 37: if (headNode.value != "右" || nodes.length == 1) {
            headNode.value = "左"
        };
        break;
        case 39: if (headNode.value != "左" || nodes.length == 1) {
            headNode.value = "右"
        };
        break;
    }
}


//产生0-1的随机数，是一个小数，不包含1
// console.log(parseInt(Math.random()*20))

