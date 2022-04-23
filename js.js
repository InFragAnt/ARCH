let data = document.getElementById("dataArr");
let day;
let activeBlock;
let actualColor;
let group = document.getElementById("group");
let subject = document.getElementById("subject");
let time = document.getElementById("time");
let inputWindow = document.getElementById("overlayInput");

if(localStorage.getItem("string") == null){
   localStorage.setItem("string", "1:1|1:2|1:3|2:1|3:1|4:1|5:1|6:1|7:1|7:2|7:3|7:4|");
}

function isEmpty(){ //ЭТО ПОСЛЕ ЛОКАЛСТОРИДЖ СОХРАННИЯ ЗАПИСИ
    let arrStr = localStorage.getItem("string").split("|");
    arrStr.length = arrStr.length - 1;
    let newArr = null;
    let newStr = "";
    arrStr.forEach(function(str){
        let counter = 0 ;
        for (let i = 0; i < 18; i++){
            if(localStorage.getItem(str+"|"+i) == null)
            {
                counter++;
            }
        }
        if (counter == 18 && str.split(":")[1] != "1"){
            newArr = arrStr.filter(function(f) { return f !== str })
            //console.log("1arrStr "+arrStr);
            //console.log("1newArr "+newArr);
            //arrStr.length = arrStr.length - 1;
            arrStr = newArr;
            //console.log("2arrStr "+arrStr);
            //console.log("2newArr "+newArr);
        }

    });
    //console.log("закончил" + newArr);

    if (newArr != null){
        newArr.forEach(function(str){
            newStr += str+"|";
        });
        localStorage.setItem("string", newStr);
    }
}

function genFields(){
    isEmpty(); //ЭТО ПОСЛЕ ЛОКАЛСТОРИДЖ СОХРАННИЯ ЗАПИСИ
    let arrStr = localStorage.getItem("string").split("|");
    arrStr.length = arrStr.length - 1;

    if(arrStr.length - 9 > 0){
        backResize(arrStr.length - 9);
    }

    for( let i = 1; i <= 7; i++) {
        let dayStringBlock = document.createElement("div");
        dayStringBlock.setAttribute('class', 'dayStringAndBlock');
        dayStringBlock.setAttribute('id', i + ":");
        data.appendChild(dayStringBlock);
    }
    //console.log(arrStr.length);
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
        //console.log(count);
        let divDay = document.getElementById("WeekDay" + `${i}`);
        divDay.style.height = `${55 * count + 11 * (count-1)}`+"px";
        divDay.firstElementChild.style.marginTop = `${(parseInt(divDay.style.height) / 2) - 20}`+"px";
        divDay.lastElementChild.style.marginTop = `${(parseInt(divDay.style.height) / 2) - 20}`+"px";
}

function countString(dayNum){  //Кол-во строк дня
    let counterString = 0;
    let arrNumString = localStorage.getItem("string").split("|");
    arrNumString.length = arrNumString.length - 1;

    arrNumString.forEach(function(str){
        //console.log("сплит "+str.split(":")[0]);
        // console.log("мое " +"D"+day);

        if(str.split(":")[0] == dayNum) {
            counterString++;
        }
    });
    //console.log(counterString);
    return counterString;
}

function addString(day,string){
    //localStorage.setItem('string', localStorage.getItem("string") + "D" + day + ":" + string + "|" );

    let dayStringBlock = document.getElementById(`${day}`+ ":");
    let trData = document.createElement("tr");
    trData.setAttribute('class', 'dataString');
    //trData.setAttribute('id', "D" + day + ":" + string + "|");
    trData.setAttribute('id',  string + "|");

    /*
    if( i >= 4 && i % 3 != 1){
        trData.style.display = "none";
    }
    */
    for(let j = 0 ; j < 18; j++){
        let divData= document.createElement("div");
        let data = "";
        if (localStorage.getItem(day + ":" + string + "|" + `${j}`) != null){
            data = localStorage.getItem(day + ":" + string + "|" + `${j}`).split("|");
            divData.innerHTML = data[2] + " " + data[0];
        }

        divData.setAttribute('id', `${j}`);
        divData.setAttribute('class', 'data');
        //ivData.onclick = function() {inputClick(this);};

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
    activeBlock = tag.parentNode.parentElement.id + tag.parentElement.id + tag.childNodes[0].id;
    actualColor = "rgb(255, 255, 255)";
    console.log(activeBlock);
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
        inputWindow.style.left = `${coords.x + window.pageXOffset - 450}`+ "px";
    }
}

function changeColor(tag){
    let arrDay = activeBlock.split(":");
    let arrString = arrDay[1].split("|");
    let block = document.getElementById(arrDay[0]+":").childNodes[arrString[0]-1].childNodes[arrString[1]];
    actualColor = window.getComputedStyle( tag ,null).getPropertyValue('background-color');
    block.style.backgroundColor = actualColor;

}

function save() {

    if (confirm('Сохранить запись?')) {

        let arrDay = activeBlock.split(":");
        let arrString = arrDay[1].split("|");
        let th = document.getElementById(arrDay[0]+":").childNodes[arrString[0]-1].childNodes[arrString[1]];
        if (group.value != "" || subject.value != "" || time.value != "") {
            localStorage.setItem(activeBlock, group.value + "|" + subject.value + "|" + time.value + "|" + actualColor);
        }else
        {
            localStorage.removeItem(activeBlock);
            th.style.backgroundColor = "rgb(255, 255, 255)";
        }

        //console.log(arrDay[0]+":");
        //console.log(arrString[0]);
        //console.log(arrString[1]);

        //let arrIdBlock = activeBlock.split("|");
        //console.log(document.getElementById(arrDay[0]+":").childNodes[arrString[0]-1].childNodes[arrString[1]].childNodes[0]);
        //console.log(arrDayString[1]);
        //console.log(arrId[0] +'и'+  arrId[1]);
        th.childNodes[0].innerHTML = time.value + " " + group.value;
    } else {

    }


    inputWindow.style.display = "none";


}



function button(tag){
    //let numIsBigNow = document.getElementsByClassName("bigDay").item(0).id.substr(7);
    //let numNewBig = tag.parentNode.id.substr(7);
    let dayStringAdd =  tag.parentNode.id.substr(7);

   //console.log(localStorage.getItem("string").indexOf("D"+`${parseInt(dayStringAdd)+1}`));
    localStorage.setItem("string", localStorage.getItem("string") + `${dayStringAdd}` + ":" + `${countString(dayStringAdd)+1}` + "|");
    addString(dayStringAdd, countString(dayStringAdd));
    backResize(1);
    dayWeekResize(parseInt(dayStringAdd));
    /*
    for(let i = 0; i < 2; i++){
        document.getElementById("S"+`${numIsBigNow * 3 - i }`).style.display = "none";
        document.getElementById("S"+`${numNewBig * 3 - i }`).style.display = "";
    }


    if(tag.parentNode.className != "bigDay"){
        tag.className = (tag.className == 'iconP' ? 'iconM' : 'iconP');
    }


    for (let l = 1; l <= 7; l++){
        if(tag.parentNode.id == "WeekDay" + `${l}`){
            tag.parentNode.className = "bigDay";
            tag.nextElementSibling.id = "bigDayText";
            continue;
        }
        document.getElementById("WeekDay" + `${l}`).className = "day";
        document.getElementById("WeekDay" + `${l}`).firstElementChild.className = "iconP"
        document.getElementById("WeekDay" + `${l}`).lastElementChild.id = "dayText";
    }
    */
}

$(document).scroll(function(){
    $('.overlay').css({
        left: $(document).scrollLeft()
    });
});

genFields();
