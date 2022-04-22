let data = document.getElementById("dataArr");
let day;
let activeBlock;

function genFields(){
    for(let i = 1 ; i <= 21; i++){
        let trData = document.createElement("tr");
        trData.setAttribute('class', 'dataString');
        trData.setAttribute('id', "S"+`${i}`);
        if( i >= 4 && i % 3 != 1){
            trData.style.display = "none";
        }
        for(let j = 0 ; j <= 17; j++){
            let divData= document.createElement("div");
            let data = "";
            if (localStorage.getItem("S" + `${i}` + "|" + `${j}`) != null){
                data = localStorage.getItem("S" + `${i}` + "|" + `${j}`).split("|");
                divData.innerHTML = data[2] + " " + data[0];
            }
            divData.setAttribute('id', `${j}`);
            divData.setAttribute('class', 'data');
            divData.onclick = function() {inputClick(this);};


            let thData = document.createElement("th");
            thData.setAttribute('id', 'dataBlock');
            thData.appendChild(divData);
            trData.appendChild(thData);
        }
        data.appendChild(trData);
    }
}
function inputClick(tag){
    activeBlock = tag.parentNode.parentElement.id + "|" + tag.id;
    let coords = tag.parentNode.getBoundingClientRect();
    let inputWindow = document.getElementsByClassName("overlayInput").item(0);
    inputWindow.style.display = "block";

    if (coords.top < 550){

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

function save(){
    let inputWindow = document.getElementsByClassName("overlayInput").item(0);
    inputWindow.style.display = "none";
    let group = document.getElementById("group").value;
    let subject = document.getElementById("subject").value;
    let time = document.getElementById("time").value;
    localStorage.setItem(activeBlock, group +"|" + subject + "|" + time);
    let arrId = activeBlock.split("|");
    console.log(arrId[0] +'и'+  arrId[1]);
    document.getElementById(arrId[0]).childNodes[arrId[1]].childNodes[0].innerHTML = time + " " + group;
}

function button(tag){
    let numIsBigNow = document.getElementsByClassName("bigDay").item(0).id.substr(7);
    let numNewBig = tag.parentNode.id.substr(7);
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

}

$(document).scroll(function(){
    $('.overlay').css({
        left: $(document).scrollLeft()
    });
});

genFields();
