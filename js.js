let data = document.getElementById("dataArr");


function genFields(){

    for(let i = 0 ; i <= 21; i++){
        let trData = document.createElement("tr");
        trData.setAttribute('class', 'dataString');
        trData.setAttribute('id', `${i}`);
        for(let j = 0 ; j <= 17; j++){
            let divData= document.createElement("div");
            divData.setAttribute('id', `${j}`);
            divData.setAttribute('class', 'data');
            let thData = document.createElement("th");
            thData.setAttribute('id', 'dataBlock');
            thData.appendChild(divData);
            trData.appendChild(thData);
        }
        data.appendChild(trData);
    }

}


$(document).scroll(function(){
    $('.overlay').css({
        left: $(document).scrollLeft()
    });
});

genFields();
