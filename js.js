let data = document.getElementById("data");

function genFields(){

    for(let i = 0 ; i <= 21; i++){
        let trData = document.createElement("tr");
        trData.setAttribute('id', 'dataString');
        for(let j = 0 ; j <= 17; j++){
            let tdData = document.createElement("td");
            tdData.setAttribute('id', 'dataBlock');
            trData.appendChild(tdData);
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
