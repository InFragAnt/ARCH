let data = document.getElementById("dataArr");
let activeBlock;
let actualColor;
let group = document.getElementById("group");
let subject = document.getElementById("subject");
let time = document.getElementById("time");
let inputWindow = document.getElementById("overlayInput");
let paramsString = window.location.href.split(".")[0].slice(-1);

if(localStorage.getItem("string"+paramsString) == null){
   localStorage.setItem("string"+paramsString, "1:1|2:1|3:1|4:1|5:1|6:1|7:1|");
}

document.addEventListener("keypress",function(event){
    if (event.code == 'KeyI' && event.ctrlKey) {
        if (confirm('Выполнить "Вставить"?')) {
            if(localStorage.getItem("BuffStr") != null || localStorage.getItem("BuffData") != null || localStorage.getItem("BuffDataKeys") != null){
                localStorage.setItem("string"+paramsString, localStorage.getItem("BuffStr"))
                let arrData = localStorage.getItem("BuffData").split("*");
                let arrDataKeys = localStorage.getItem("BuffDataKeys").split(",");
                for(let i = 0; i < arrData.length-1; i++){
                    arrDataKeys[i] = paramsString + arrDataKeys[i].slice(1,arrDataKeys[i].length);
                    localStorage.setItem(arrDataKeys[i], arrData[i])
                    location.reload();
                }
            }else
            {
                alert("Буффер обмена пуст. Вы ничего не скопировали.")
            }
        }
        localStorage.setItem("BuffStr", null);
        localStorage.setItem("BuffData", null);
        localStorage.setItem("BuffDataKeys", null);
    }
});

function changeSemestr(){
    if (paramsString == 1){
        window.location.href = '2.html';
    }else
    {
        window.location.href = '1.html';
    }
}

function copy(){
    //let localDataStr = localStorage.getItem("string"+paramsString)
    localStorage.setItem("BuffStr", localStorage.getItem("string"+paramsString));
    let strData = [];
    let arrDataKeys = [];
    for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i).slice(0,1) == paramsString){
            strData+=localStorage.getItem(localStorage.key(i))+"*";
            arrDataKeys.push(localStorage.key(i));
        }
    }
    localStorage.setItem("BuffData", strData);
    localStorage.setItem("BuffDataKeys", arrDataKeys);
    alert("Расписание скопировано. \nДля того, чтобы вставить расписание нажмите CTRL+I");
}

function isEmpty(){
    let arrStr = localStorage.getItem("string"+paramsString).split("|");
    arrStr.length = arrStr.length - 1;
    let newArr = null;
    let newStr = "";
    console.log(arrStr);
    arrStr.forEach(function(str){
        let counter = 0;
        //console.log("Строка " + str);
        //console.log("Counter " + counter);
        for (let i = 0; i < 18; i++){
            if(localStorage.getItem(paramsString+ "S" + str + "|" +i) == null)
            {
                //console.log(paramsString+ "S" + str + "|" +i);
                counter++;
            }
        }
        //console.log("Counter " + counter);
        if (counter == 18 && str.split(":")[1] != "1"){
            //console.log("Строка "+ str + "Удалена")
            newArr = arrStr.filter(function(f) { return f !== str })
            arrStr = newArr;
        }
    });
    if (newArr != null){
        newArr.forEach(function(str){
            newStr += str+"|";
        });
        localStorage.setItem("string"+paramsString, newStr);
    }
}

function genFields(){
    isEmpty();
    let arrStr = localStorage.getItem("string"+paramsString).split("|");
    arrStr.length = arrStr.length - 1;

    if(arrStr.length - 7 > 0){
        backResize(arrStr.length - 7);
    }

    for( let i = 1; i <= 7; i++) {
        let dayStringBlock = document.createElement("div");
        dayStringBlock.setAttribute('class', 'dayStringAndBlock');
        dayStringBlock.setAttribute('id', i + ":");
        data.appendChild(dayStringBlock);
    }
    arrStr.forEach(function(str){
        let strNum = str.split(":");
        addString(strNum[0], strNum[1]);
    });

    for( let i = 1; i <= 7; i++) {
        dayWeekResize(i);
    }
}

function dayWeekResize(i){
        let count = countString(i);
        let divDay = document.getElementById("WeekDay" + `${i}`);
        divDay.style.height = `${55 * count + 11 * (count-1)}`+"px";
        divDay.firstElementChild.style.marginTop = `${(parseInt(divDay.style.height) / 2) - 20}`+"px";
        divDay.lastElementChild.style.marginTop = `${(parseInt(divDay.style.height) / 2) - 20}`+"px";
}

function countString(dayNum){
    let counterString = 0;
    let arrNumString = localStorage.getItem("string"+paramsString).split("|");
    arrNumString.length = arrNumString.length - 1;

    arrNumString.forEach(function(str){

        if(str.split(":")[0] == dayNum) {
            counterString++;
        }
    });
    return counterString;
}

function addString(day,string){

    let dayStringBlock = document.getElementById(`${day}`+ ":");
    let trData = document.createElement("tr");
    trData.setAttribute('class', 'dataString');
    trData.setAttribute('id',  string + "|");

    for(let j = 0 ; j < 18; j++){
        let divData= document.createElement("div");
        let data = "";
        if (localStorage.getItem(paramsString+"S"+  day + ":" + string + "|" + `${j}`) != null){
            data = localStorage.getItem(paramsString+"S"+ day + ":" + string + "|" + `${j}`).split("|");
            divData.innerHTML = data[2] + " " + data[0];
        }
        divData.setAttribute('id', `${j}`);
        divData.setAttribute('class', 'data');
        let thData = document.createElement("th");
        thData.setAttribute('id', 'dataBlock');
        thData.onclick = function() {inputClick(this);};
        thData.style.backgroundColor = data[3];
        thData.appendChild(divData);
        trData.appendChild(thData);
    }
    dayStringBlock.appendChild(trData);
}

function backResize(i){
    let back = document.getElementById("back");
    let glass = document.getElementById("glass");
    let heightBack = window.getComputedStyle(back).height;
    let heightGlass = window.getComputedStyle(glass).height;
    back.style.height = `${ parseInt(heightBack) + 70 * i}`+ "px";
    glass.style.height = `${ parseInt(heightGlass) + 70 * i}`+ "px";
}

function inputClick(tag){
    activeBlock = paramsString + "S" +tag.parentNode.parentElement.id + tag.parentElement.id + tag.childNodes[0].id;
    actualColor = "rgb(255, 255, 255)";
    if (localStorage.getItem(activeBlock) != null){
        let dataValue = localStorage.getItem(activeBlock).split("|");
        group.value = dataValue[0];
        subject.value = dataValue[1];
        time.value = dataValue[2];
    }else{
        group.value = "";
        subject.value = "";
        time.value = "";
    }

    let coords = tag.getBoundingClientRect();
    inputWindow.style.display = "block";
    document.getElementById("ball1").style.backgroundColor = localStorage.getItem('ball1');
    document.getElementById("ball2").style.backgroundColor = localStorage.getItem('ball2');
    document.getElementById("ball3").style.backgroundColor = localStorage.getItem('ball3');
    if (coords.top < 500){
        inputWindow.style.top = `${coords.top + window.pageYOffset + 20}`+ "px";
    }else
    {
        inputWindow.style.top = `${coords.top  + window.pageYOffset - 330}`+ "px";
    }
    if (coords.left + window.pageXOffset < 3900){
        inputWindow.style.left = `${coords.x + window.pageXOffset + 20}`+ "px";
    }else
    {
        inputWindow.style.left = `${coords.x + window.pageXOffset - 500}`+ "px";
    }
}

function changeColor(tag){
    let arrTDay = activeBlock.split(":");
    let arrString = arrTDay[1].split("|");
    let block = document.getElementById(arrTDay[0].split("S")[1]+":").childNodes[arrString[0]-1].childNodes[arrString[1]];
    actualColor = window.getComputedStyle( tag ,null).getPropertyValue('background-color');
    block.style.backgroundColor = actualColor;
}

function save() {
    if (confirm('Сохранить запись?')) {

        let arrTDay = activeBlock.split(":");
        let arrString = arrTDay[1].split("|");
        let th = document.getElementById(arrTDay[0].split("S")[1]+":").childNodes[arrString[0]-1].childNodes[arrString[1]];
        if (group.value != "" || subject.value != "" || time.value != "" || actualColor != "") {
            localStorage.setItem(activeBlock, group.value + "|" + subject.value + "|" + time.value + "|" + actualColor);
        }else
        {
            localStorage.removeItem(activeBlock);
        }
        th.childNodes[0].innerHTML = time.value + " " + group.value;
    }
    inputWindow.style.display = "none";
}



function button(tag){
    let dayStringAdd =  tag.parentNode.id.substr(7);
    localStorage.setItem("string"+paramsString, localStorage.getItem("string"+paramsString) + `${dayStringAdd}` + ":" + `${countString(dayStringAdd)+1}` + "|");
    addString(dayStringAdd, countString(dayStringAdd));
    backResize(1);
    dayWeekResize(parseInt(dayStringAdd));
}

$(document).scroll(function(){
    $('.overlay').css({
        left: $(document).scrollLeft()
    });
});

$(document).scroll(function(){
    if(window.pageYOffset > 200){
        $('.overlay1').css({
            top: -200+ $(document).scrollTop()
        });
    }
    if ($(document).scrollTop() < 200){
        $('.overlay1').css({
            top: 0
        });
    }
});

genFields();
